package main.sswitch.trash.repository;

import main.sswitch.trash.entity.TrashCan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TrashRepository extends JpaRepository<TrashCan, Long> {

    @Query(value = "SELECT t FROM TrashCan t WHERE t.trashId= :trashId")
    Optional<TrashCan> findByTrashCan(long trashId);
}
