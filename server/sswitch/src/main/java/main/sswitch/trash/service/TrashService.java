package main.sswitch.trash.service;

import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.trash.entity.TrashCan;
import main.sswitch.trash.repository.TrashRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TrashService {
    private final TrashRepository trashRepository;

    public TrashService(TrashRepository trashRepository) {
        this.trashRepository = trashRepository;
    }

    public TrashCan createTrashCan(TrashCan trashCan) {
//        verifyExistTrashCan(trashCan.getTrashId());
        TrashCan savedTrashCan = trashRepository.save(trashCan);

        return savedTrashCan;
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

    public Page<TrashCan> findTrashCans(int page, int size) {
        return trashRepository.findAll(PageRequest.of(page, size,
                Sort.by("trashId").ascending()));
    }

    public void deleteTrashCan(long trashId) {
        TrashCan trashCan = findVerifiedTrashCan(trashId);
        trashRepository.delete(trashCan);
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
}
