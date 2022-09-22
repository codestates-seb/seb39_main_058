package main.sswitch.boards.trash.controller;

import main.sswitch.boards.trash.dto.TrashStatusDto;
import main.sswitch.boards.trash.entity.TrashCan;
import main.sswitch.boards.trash.mapper.TrashMapper;
import main.sswitch.boards.trash.service.TrashService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import main.sswitch.boards.trash.dto.TrashPatchDto;
import main.sswitch.boards.trash.dto.TrashPostDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/trash")
@Validated
public class TrashController {
    private TrashService trashService;
    private TrashMapper mapper;

    public TrashController(TrashService trashService, TrashMapper mapper) {
        this.trashService = trashService;
        this.mapper = mapper;
    }

    //쓰레기통 등록
    @PostMapping
    public ResponseEntity postTrashCan(@Valid @RequestBody TrashPostDto trashPostDto) {
        TrashCan trashCan = trashService.createTrashCan(mapper.trashPostDtoToTrash(trashPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.trashToTrashResponseDto(trashCan)),
                HttpStatus.CREATED);
    }

    // 수정시 쓰레기통 상태 변환 가능
    // 우선 프론트에서 제보
    @PatchMapping("/{trash-id}")
    public ResponseEntity patchTrashCan(@PathVariable("trash-id") @Positive long trashId,
                                        @Valid @RequestBody TrashPatchDto trashPatchDto) {
        trashPatchDto.setTrashId(trashId);
        TrashCan trashCan = trashService.updateTrashCan(mapper.trashPatchDtoToTrash(trashPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.trashToTrashResponseDto(trashCan)),
                HttpStatus.OK);
    }

    //쓰레기통 비움 기능(상황에 맞게 패치와 합침 가능)
    @PatchMapping("/flush/{trash-id}")
    public ResponseEntity TrashCan(@PathVariable("flush/trash-id") @Positive long trashId,
                                   @Valid @RequestBody TrashStatusDto trashStatusDto) {
        trashStatusDto.setTrashId(trashId);
        TrashCan trashCan = trashService.changeTrashCanStatus(mapper.trashStatusChangeDtoToTrash(trashStatusDto));

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

    //쓰레기통 삭제
    @DeleteMapping("/{trash-id}")
    public ResponseEntity deleteTrashCans(@PathVariable("trash-id") long trashId) {
        trashService.deleteTrashCan(trashId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
