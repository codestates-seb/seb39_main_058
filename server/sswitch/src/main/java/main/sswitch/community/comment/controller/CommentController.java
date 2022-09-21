package main.sswitch.community.comment.controller;

import main.sswitch.community.comment.dto.CommentGetDto;
import main.sswitch.community.comment.dto.CommentPatchDto;
import main.sswitch.community.comment.dto.CommentPostDto;
import main.sswitch.community.comment.entity.Comment;
import main.sswitch.community.comment.mapper.CommentMapper;
import main.sswitch.community.comment.service.CommentService;
import main.sswitch.response.dto.MultiResponseDto;
import main.sswitch.response.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/community/comment")
public class CommentController {
    private CommentService commentService;
    private CommentMapper mapper;

    public CommentController(CommentService commentService,
                             CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    //댓글 등록
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto) {
        Comment comment = commentService.createComment(mapper.CommentPostDtoToComment(commentPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.CommentToCommentResponseDto(comment)),
                HttpStatus.CREATED);
    }

    //댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        commentPatchDto.setCommentId(commentId);
        Comment comment = commentService.updateComment(mapper.CommentPatchDtoToComment(commentPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.CommentToCommentResponseDto(comment)),
                HttpStatus.OK);
    }

    //댓글 조회
    @GetMapping
    public ResponseEntity getComments(
//            @Positive @RequestParam int page,
//                                      @Positive @RequestParam int size,
            @Valid @RequestBody CommentGetDto commentGetDto) {
//        Page<Comment> pageComments = commentService.findComments(page - 1, size, forumId);
        List<Comment> comments = commentService.findComments(mapper.CommentGetDtoToComment(commentGetDto));

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.CommentsToCommentsResponseDto(comments)), HttpStatus.OK);
    }

    //댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
