package main.sswitch.community.comment.service;

import main.sswitch.community.comment.entity.Comment;
import main.sswitch.community.comment.repository.CommentRepository;
import main.sswitch.community.forum.service.ForumService;
import main.sswitch.exceptions.BusinessLogicException;
import main.sswitch.exceptions.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    private ForumService forumService;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        verifyForum(comment);
        Comment savedComment = commentRepository.save(comment);

        return savedComment;
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getText())
                .ifPresent(text -> findComment.setText(text));

        return commentRepository.save(findComment);
    }

//    public List<Comment> findComments(Comment comment,
//                                      Forum forum) {
//
//        List<Comment> comments = commentRepository.findAll(comment.getForumId() == forum.getForumId());
//
//        return comments;
//    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);

        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }

    public void deleteComment(long commentId) {
        Comment comment = findVerifiedComment(commentId);
        commentRepository.delete(comment);
    }

    public List<Comment> findComments(Comment comment) {

        List<Comment> comments =
                commentRepository.findByForumId(comment.getForum().getForumId());

        return comments;
    }

    public void verifyForum(Comment comment) {
        forumService.findVerifiedForum(comment.getForum().getForumId());

    }
}
