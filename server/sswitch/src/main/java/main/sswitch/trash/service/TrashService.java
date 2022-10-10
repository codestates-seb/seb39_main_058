package main.sswitch.trash.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.trash.entity.TrashCan;

import main.sswitch.trash.repository.TrashRepository;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrashService {
    private final TrashRepository trashRepository;
//    private final TrashCanAlarmRepository alarmRepository;
//    private final TrashAlarmMapper alarmMapper;
    private final UserService userService;


    @Transactional
    public TrashCan createTrashCan(TrashCan trashCan, User user, String address) {
        trashCan.setUser(user);
//        TrashCanAlarm alarm = new TrashCanAlarm();
//        alarm.setUser(user);
//        alarm.setAddress(address);
//        alarm.setTrashStatus(alarm.getTrashStatus());
//        alarmRepository.save(alarm);
        return trashRepository.save(trashCan);
    }


    public TrashCan updateTrashCan(TrashCan trashCan) {
        TrashCan findTrashCan = findVerifiedTrashCan(trashCan.getTrashId());

        Optional.ofNullable(trashCan.getLongitude())
                .ifPresent(longitude -> findTrashCan.setLongitude(longitude));
        Optional.ofNullable(trashCan.getLatitude())
                .ifPresent(latitude -> findTrashCan.setLatitude(latitude));

        return trashRepository.save(findTrashCan);
    }

//    public TrashCanAlarm changeTrashCanStatus(long trashCanId) {
//        TrashCan findTrashCans = findTrashCan(trashCanId);
//        long userId = findTrashCans.getUser().getUserId();
//        TrashCanAlarm findAlarm = findVerifiedAlarmWithUserId(userId);
//        TrashCanAlarm changeAlarm = findVerifiedAlarm(findAlarm);
//
//        if(findAlarm.getTrashStatus() == TrashCanAlarm.TrashStatus.TRASH_CAN_FULL) {
//            Optional.ofNullable(findAlarm.getTrashStatus())
//                    .ifPresent(trashStatus -> changeAlarm.setTrashStatus(TrashCanAlarm.TrashStatus.TRASH_CAN_EMPTY));
//        }
//        return alarmRepository.save(findAlarm);
//    }


    public TrashCan findTrashCan(long trashId) {
        return findVerifiedTrashCanByQuery(trashId);
    }

//    public TrashCanAlarm findTrashCanAlarm(long trashId) {
//        return findVerifiedTrashCanId(trashId);
//    }

    public Page<TrashCan> findTrashCans(int page, int size) {
        return trashRepository.findAll(PageRequest.of(page, size,
                Sort.by("trashId").ascending()));
    }

    public void deleteTrashCan(long trashId) {
        TrashCan trashCan = findVerifiedTrashCan(trashId);
        trashRepository.delete(trashCan);
    }

    public void emptyTrashCan(long trashId){
        TrashCan findTrashCan = findTrashCan(trashId);
//        changeTrashCanStatus(trashId);
        trashRepository.delete(findTrashCan);
    }



    public TrashCan findVerifiedTrashCan(long trashId) {
        Optional<TrashCan> optionalTrashCan = trashRepository.findById(trashId);
        TrashCan findTrashCan =
                optionalTrashCan.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TRASHCAN_NOT_FOUND));

        return findTrashCan;
    }

//    public TrashCanAlarm findVerifiedAlarm(TrashCanAlarm trashCanAlarm) {
//        long userId = trashCanAlarm.getUser().getUserId();
//        String address = trashCanAlarm.getAddress();
//        Optional<TrashCanAlarm> optionalTrashCan = alarmRepository.findByUserIdAndAddress(userId, address);
//        TrashCanAlarm findAlarm =
//                optionalTrashCan.orElseThrow(() ->
//                        new BusinessLogicException(ExceptionCode.TRASHCAN_NOT_FOUND));
//
//        return findAlarm;
//    }
//
//    public List<TrashCanAlarm> findVerifiedAlarmWithUserId(long userId) {
//        List<TrashCanAlarm> findAlarms = alarmRepository.findAllByUserId(userId);
//        return findAlarms;
//    }

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

//    public TrashCanAlarm findVerifiedTrashAlarm(long trashId) {
//        Optional<TrashCanAlarm> optionalTrashCanAlarm = alarmRepository.findByTrashCanId(trashId);
//        TrashCanAlarm findAlarm =
//                optionalTrashCanAlarm.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TRASHCAN_NOT_FOUND));
//        return findAlarm;
//    }
    public TrashCan findVerifiedTrashCanId(long trashId) {
        Optional<TrashCan> optionalTrashCan = trashRepository.findByTrashCan(trashId);
        TrashCan findTrashCan =
                optionalTrashCan.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TRASHCAN_NOT_FOUND));
        return findTrashCan;
    }
}
