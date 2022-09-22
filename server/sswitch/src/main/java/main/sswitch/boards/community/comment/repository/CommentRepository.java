package main.sswitch.boards.community.comment.repository;

import main.sswitch.boards.community.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(nativeQuery = true, value = "SELECT c FROM Comment c WHERE c.forumId = :forumId")
    List<Comment> findByForumId(long forumId);
}
