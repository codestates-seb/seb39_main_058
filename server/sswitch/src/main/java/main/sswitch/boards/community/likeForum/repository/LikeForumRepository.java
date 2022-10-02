package main.sswitch.boards.community.likeForum.repository;

import main.sswitch.boards.community.likeForum.entity.LikeForum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LikeForumRepository extends JpaRepository<LikeForum, Long> {

    @Query(value = "select * from LikeForum where user_id = :userId", nativeQuery = true)
    Optional<LikeForum> findByUserId(long userId);
}
