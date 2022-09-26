package main.sswitch.boards.community.comment.mapper;

import main.sswitch.boards.community.comment.dto.*;
import main.sswitch.boards.community.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment CommentPostDtoToComment(CommentPostDto commentPostDto);

    Comment CommentPatchDtoToComment(CommentPatchDto commentPatchDto);

    Comment CommentGetDtoToComment(CommentGetDto commentGetDto);

//    CommentResponseDto CommentToCommentResponseDto(Comment comment);

    default CommentReturnDto commentToCommentReturnDto(Comment comment) {
        CommentReturnDto commentReturnDto = new CommentReturnDto();

        commentReturnDto.setUserName(comment.getUser().getUserName());
        commentReturnDto.setForumId(comment.getForum().getForumId());
        commentReturnDto.setCommnetId(comment.getCommentId());
        commentReturnDto.setCommentText(comment.getCommentText());
        commentReturnDto.setDateCreated(comment.getDateCreated());


        return commentReturnDto;
    }
    List<CommentResponseDto> CommentsToCommentsResponseDto(List<Comment> comments);
}
