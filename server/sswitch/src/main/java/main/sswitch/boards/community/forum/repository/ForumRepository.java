package main.sswitch.boards.community.forum.repository;

import main.sswitch.boards.community.forum.entity.Forum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ForumRepository extends JpaRepository<Forum, Long> {

    Page<Forum> findByForumTitleContaining(String title, Pageable pageable);

    Page<Forum> findByTagContaining(String tag, Pageable pageable);

    Page<Forum> findByForumTextContains(String text, Pageable pageable);

    @Query(value = "SELECT * FROM forum WHERE user_id = :userId", nativeQuery = true)
    Page<Forum> findByForumUserId(long userId, Pageable pageable);
}
