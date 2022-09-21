package main.sswitch.community.comment.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import main.sswitch.community.comment.dto.CommentGetDto;
import main.sswitch.community.comment.dto.CommentPatchDto;
import main.sswitch.community.comment.dto.CommentPostDto;
import main.sswitch.community.comment.dto.CommentResponseDto;
import main.sswitch.community.comment.entity.Comment;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-20T15:45:52+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment CommentPostDtoToComment(CommentPostDto commentPostDto) {
        if ( commentPostDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        return comment;
    }

    @Override
    public Comment CommentPatchDtoToComment(CommentPatchDto commentPatchDto) {
        if ( commentPatchDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setCommentId( commentPatchDto.getCommentId() );

        return comment;
    }

    @Override
    public Comment CommentGetDtoToComment(CommentGetDto commentGetDto) {
        if ( commentGetDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setCommentId( commentGetDto.getCommentId() );

        return comment;
    }

    @Override
    public CommentResponseDto CommentToCommentResponseDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentResponseDto commentResponseDto = new CommentResponseDto();

        return commentResponseDto;
    }

    @Override
    public List<CommentResponseDto> CommentsToCommentsResponseDto(List<Comment> comments) {
        if ( comments == null ) {
            return null;
        }

        List<CommentResponseDto> list = new ArrayList<CommentResponseDto>( comments.size() );
        for ( Comment comment : comments ) {
            list.add( CommentToCommentResponseDto( comment ) );
        }

        return list;
    }
}
