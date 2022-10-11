package main.sswitch.trash.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.sswitch.security.oauth.PrincipalDetails;

//import main.sswitch.trash.dto.TrashStatusDto;
import main.sswitch.trash.entity.TrashCan;
import main.sswitch.trash.entity.TrashCanAlarm;
import main.sswitch.trash.mapper.TrashAlarmMapper;
import main.sswitch.trash.mapper.TrashMapper;
import main.sswitch.trash.service.TrashService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import main.sswitch.trash.dto.TrashPatchDto;
import main.sswitch.trash.dto.TrashPostDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/trash")
@Validated
@AllArgsConstructor
@Slf4j
public class TrashController {
    private TrashService trashService;
    private TrashMapper mapper;
    private UserService userService;

    private TrashAlarmMapper alarmMapper;

//    public TrashController(TrashService trashService, TrashMapper mapper, TrashAlarmMapper alarmMapper) {
//        this.trashService = trashService;
//        this.mapper = mapper;
//        this.alarmMapper = alarmMapper;
//    }

    //쓰레기통 비움 요청 등록
    @PostMapping("/flush/create")
    public ResponseEntity postTrashCan(@AuthenticationPrincipal PrincipalDetails principal, @Valid @RequestBody TrashPostDto trashPostDto) {
        User user = userService.findUserWithLoginId(principal.getUsername());
        String address = trashPostDto.getAddress();
        TrashCan trashCan = trashService.createTrashCan(mapper.trashPostDtoToTrash(trashPostDto), user, address);
//        trashCan.setTrashStatus(trashPostDto.getTrashStatus());
        userService.updatePoints(user,user.getCurrentPoints(),0,user.getTotalPoints(),100);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.trashToTrashResponseDto(trashCan)),
                HttpStatus.CREATED);
    }


    @PatchMapping("/take/{trash-id}")
    public ResponseEntity patchTrashCan(@PathVariable("trash-id") @Positive long trashId,
                                        @Valid @RequestBody TrashPatchDto trashPatchDto) {
        trashPatchDto.setTrashId(trashId);
        TrashCan trashCan = trashService.updateTrashCan(mapper.trashPatchDtoToTrash(trashPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.trashToTrashResponseDto(trashCan)),
                HttpStatus.OK);
    }


    //쓰레기통 조회
    @GetMapping("/{trash-id}")
    public ResponseEntity getTrashCan(@PathVariable("trash-id") long trashId) {
        TrashCan trashCan = trashService.findTrashCan(trashId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.trashToTrashResponseDto(trashCan)),
                HttpStatus.OK);
    }

    //쓰레기통 정보 페이지(목록 조회)
    @GetMapping
    public ResponseEntity getTrashCans(@RequestParam int page,
                                       @RequestParam int size) {
        Page<TrashCan> pageTrashCans = trashService.findTrashCans(page - 1, size);
        List<TrashCan> trashCans = pageTrashCans.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.trashesToTrashResponseDto(trashCans),
                        pageTrashCans), HttpStatus.OK);
    }
    //유저 아이디에 따른 비워진 쓰레기통 알림 목록 가져오기
    @GetMapping("/alarms/list")
    public ResponseEntity getAllTrashAlarm(@AuthenticationPrincipal PrincipalDetails principal) {
        User findUser = userService.findUserWithLoginId(principal.getUsername());
        List< TrashCanAlarm> trashCanAlarms = trashService.findVerifiedAlarmWithUserIdAndStatus(findUser.getUserId(), 0);
        return new ResponseEntity<>(new SingleResponseDto<>(alarmMapper.alarmsToAlarmResponseDto(trashCanAlarms)),HttpStatus.OK);

    }

    //쓰레기통 알림 삭제
    @DeleteMapping("/alarms/{trash-alarm-id}")
    public ResponseEntity deleteTrashCans(@AuthenticationPrincipal PrincipalDetails principal, @PathVariable("trash-alarm-id") long trashCanAlarmId) {
        User findUser = userService.findUserWithLoginId(principal.getUsername());
        trashService.deleteTrashCanAlarm(trashCanAlarmId, findUser);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    //쓰레기통 비움
    @DeleteMapping("/flush/{trash-id}")
    public ResponseEntity deleteTrashCanAlarm(@PathVariable("trash-id") long trashId) {
        trashService.emptyTrashCan(trashId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
