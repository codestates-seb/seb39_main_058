//package main.sswitch.trash.repository;
//
//import main.sswitch.trash.entity.TrashCan;
//import main.sswitch.trash.entity.TrashCanAlarm;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import java.util.Optional;
//
//public interface TrashCanAlarmRepository extends JpaRepository<TrashCanAlarm, Long> {
//    @Query(value = "SELECT a FROM TrashCanAlarm a WHERE a.trashCan.trashId = :trashId")
//    Optional<TrashCanAlarm> findByTrashCanId(long trashId);
//}
