package main.sswitch.trash.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.trash.dto.TrashCanAlarmDto;
import main.sswitch.trash.dto.TrashPostDto;
import main.sswitch.trash.dto.TrashResponseDto;
import main.sswitch.trash.entity.TrashCan;
import main.sswitch.trash.entity.TrashCanAlarm;
import main.sswitch.trash.repository.TrashCanAlarmRepository;
import main.sswitch.trash.repository.TrashRepository;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrashService {
    private final TrashRepository trashRepository;
    private final TrashCanAlarmRepository trashCanAlarmRepository;
    private final UserService userService;


    public TrashCan createTrashCan(TrashCan trashCan) {
        TrashCan savedTrashCan = trashRepository.save(trashCan);
        return savedTrashCan;
    }

    public TrashCanAlarm createTrashCanAlarm(TrashCanAlarmDto requestBody, long trashId){
        User user = userService.findUserWithId(requestBody.getUserId());
        TrashCan trashCan = findTrashCan(trashId);
        TrashCanAlarm trashCanAlarm = new TrashCanAlarm();
        trashCanAlarm.setUser(user);
        trashCanAlarm.setTrashCan(trashCan);
        TrashCanAlarm
                .builder()
                .trashCan(trashCan)
                .user(user)
                .build();
        userService.updatePoints(trashCanAlarm.getUser(),trashCanAlarm.getUser().getCurrentPoints(),0,trashCanAlarm.getUser().getTotalPoints(),100);
        return trashCanAlarmRepository.save(trashCanAlarm);
    }

    public TrashCan updateTrashCan(TrashCan trashCan) {
        TrashCan findTrashCan = findVerifiedTrashCan(trashCan.getTrashId());

        Optional.ofNullable(trashCan.getLongitude())
                .ifPresent(longitude -> findTrashCan.setLongitude(longitude));
        Optional.ofNullable(trashCan.getLatitude())
                .ifPresent(latitude -> findTrashCan.setLatitude(latitude));
        Optional.ofNullable(trashCan.getTrashStatus())
                .ifPresent(trashStatus -> findTrashCan.setTrashStatus(trashStatus));

        return trashRepository.save(findTrashCan);
    }

    public TrashCan changeTrashCanStatus(TrashCan trashCan) {
        TrashCan findTrashCan = findVerifiedTrashCan(trashCan.getTrashId());

        if (trashCan.getTrashStatus() != TrashCan.TrashStatus.TRASH_CAN_FULL) {
            Optional.ofNullable(trashCan.getTrashStatus())
                    .ifPresent(trashStatus -> findTrashCan.setTrashStatus(TrashCan.TrashStatus.TRASH_CAN_FULL));
        } else {
            Optional.ofNullable(trashCan.getTrashStatus())
                    .ifPresent(trashStatus -> findTrashCan.setTrashStatus(TrashCan.TrashStatus.TRASH_CAN_EMPTY));
        }

        return trashRepository.save(findTrashCan);
    }


    public TrashCan findTrashCan(long trashId) {
        return findVerifiedTrashCanByQuery(trashId);
    }

    public TrashCanAlarm findTrashCanAlarm(long trashId) {
        return findVerifiedTrashCanId(trashId);
    }

    public Page<TrashCan> findTrashCans(int page, int size) {
        return trashRepository.findAll(PageRequest.of(page, size,
                Sort.by("trashId").ascending()));
    }

    public void deleteTrashCan(long trashId) {
        TrashCan trashCan = findVerifiedTrashCan(trashId);
        trashRepository.delete(trashCan);
    }

    public void deleteTrashCanAlarm(long trashId){
        TrashCanAlarm findTrashCanAlarm = findTrashCanAlarm(trashId);
        trashCanAlarmRepository.delete(findTrashCanAlarm);
        TrashCan findTrashCan = findTrashCan(trashId);
        changeTrashCanStatus(findTrashCan);
    }


    public TrashCan findVerifiedTrashCan(long trashId) {
        Optional<TrashCan> optionalTrashCan = trashRepository.findById(trashId);
        TrashCan findTrashCan =
                optionalTrashCan.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TRASHCAN_NOT_FOUND));

        return findTrashCan;
    }

    public void verifyExistTrashCan(long trashId) {
        Optional<TrashCan> trashCan = trashRepository.findById(trashId);
        if (trashCan.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.TRASHCAN_EXISTS);
        }
    }

    public TrashCan findVerifiedTrashCanByQuery(long trashId) {
        Optional<TrashCan> optionalTrashCan = trashRepository.findByTrashCan(trashId);
        TrashCan findTrashCan =
                optionalTrashCan.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TRASHCAN_NOT_FOUND));
        return findTrashCan;
    }

    public TrashCanAlarm findVerifiedTrashCanId(long trashId) {
        Optional<TrashCanAlarm> optionalTrashCan = trashCanAlarmRepository.findByTrashCanId(trashId);
        TrashCanAlarm findTrashCan =
                optionalTrashCan.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TRASHCAN_NOT_FOUND));
        return findTrashCan;
    }
}
