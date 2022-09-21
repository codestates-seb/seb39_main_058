package main.sswitch.community.comment.mapper;

import main.sswitch.community.comment.dto.CommentGetDto;
import main.sswitch.community.comment.dto.CommentPatchDto;
import main.sswitch.community.comment.dto.CommentPostDto;
import main.sswitch.community.comment.dto.CommentResponseDto;
import main.sswitch.community.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment CommentPostDtoToComment(CommentPostDto commentPostDto);

    Comment CommentPatchDtoToComment(CommentPatchDto commentPatchDto);

    Comment CommentGetDtoToComment(CommentGetDto commentGetDto);

    CommentResponseDto CommentToCommentResponseDto(Comment comment);

    List<CommentResponseDto> CommentsToCommentsResponseDto(List<Comment> comments);
}
