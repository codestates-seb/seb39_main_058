package main.sswitch.trash.repository;

import main.sswitch.trash.entity.TrashCan;
import main.sswitch.trash.entity.TrashCanAlarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TrashCanAlarmRepository extends JpaRepository<TrashCanAlarm, Long> {
    @Query(value = "SELECT * FROM trashcan_alarm WHERE user_Id = :userId", nativeQuery = true)
    List<TrashCanAlarm> findAllByUserId(long userId);
//
    @Query(value = "SELECT * FROM trashcan_alarm WHERE user_Id = :userId and trash_status = :trashStatus", nativeQuery = true)
    List<TrashCanAlarm> findAllByUserIdAndStatus(long userId, int trashStatus);
//
    @Query(value = "SELECT * FROM trashcan_alarm WHERE user_Id = :userId and address = :address", nativeQuery = true)
    List<TrashCanAlarm> findAllByUserIdAndAddress(long userId, String address);
    @Query(value = "SELECT t FROM TrashCanAlarm t WHERE t.trashCanAlarmId= :trashAlarmId")
    Optional<TrashCanAlarm> findByAlarmId(long trashAlarmId);
}
