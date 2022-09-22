package main.sswitch.boards.community.forum.repository;

import main.sswitch.boards.community.forum.entity.Forum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Forum, Long> {

//    @Query(value = "SEARCH f FROM Forum f WHERE f.forumTitle =: forumTitle")
//    Optional<Forum> searchByTitle(String forumTitle);


    Page<Forum> findByForumTitleContaining(String keyword, Pageable pageable);
}
