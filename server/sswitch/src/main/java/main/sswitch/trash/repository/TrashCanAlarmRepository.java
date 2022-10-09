//package main.sswitch.trash.repository;
//
//import main.sswitch.trash.entity.TrashCan;
//import main.sswitch.trash.entity.TrashCanAlarm;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface TrashCanAlarmRepository extends JpaRepository<TrashCanAlarm, Long> {
//    @Query(value = "SELECT e FROM TrashCanAlarm e WHERE e.trashCanAlarmId = :trashCanAlarmId")
//    Optional<TrashCanAlarm> findByTrashCanAlarmId(long trashCanAlarmId);
//
//    @Query(value = "SELECT * FROM trashcan_alarm WHERE userId = :userId", nativeQuery = true)
//    List<TrashCanAlarm> findAllByUserId(long userId);
//
//    @Query(value = "SELECT * FROM trashcan_alarm WHERE userId = :userId and address = :address", nativeQuery = true)
//    Optional<TrashCanAlarm> findByUserIdAndAddress(long userId, String address);
//}
