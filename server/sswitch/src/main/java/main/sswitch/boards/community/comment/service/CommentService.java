package main.sswitch.boards.community.comment.service;

import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.comment.repository.CommentRepository;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.forum.service.ForumService;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    private ForumService forumService;

    public CommentService(CommentRepository commentRepository,
                          ForumService forumService) {
        this.forumService = forumService;
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {

        Comment savedComment = commentRepository.save(comment);
        long forumId = savedComment.getForum().getForumId();
        forumService.countPlus(forumId);
        return savedComment;
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getCommentText())
                .ifPresent(text -> findComment.setCommentText(text));

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

        long forumId = comment.getForum().getForumId();
        forumService.countMinus(forumId);
        commentRepository.delete(comment);
    }

    public List<Comment> findComments(Comment comment) {

        List<Comment> comments =
                commentRepository.findByForumId(comment.getForum().getForumId());

        return comments;
    }

    public void verifyExistComment(Comment comment) {
        long forumId = comment.getForum().getForumId();
        Optional<Comment> optionalComment = commentRepository.findById(comment.getCommentId());
        if (optionalComment.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_EXIST);
        }
    }
}
