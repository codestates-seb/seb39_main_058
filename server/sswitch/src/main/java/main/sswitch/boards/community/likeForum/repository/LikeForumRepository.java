package main.sswitch.boards.community.likeForum.repository;

import main.sswitch.boards.community.likeForum.entity.LikeForum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LikeForumRepository extends JpaRepository<LikeForum, Long> {

    @Query(value = "select * from like_forum where user_id = :userId", nativeQuery = true)
    Optional<LikeForum> findByUserId(long userId);

    @Query(value = "select * from like_forum where user_id = :userId and forum_id =:forumId", nativeQuery = true)
    Optional<LikeForum> findByUserAndForumId(long userId, long forumId);
}
