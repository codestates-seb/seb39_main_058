package main.sswitch.community.forum.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import main.sswitch.community.forum.dto.ForumPatchDto;
import main.sswitch.community.forum.dto.ForumPostDto;
import main.sswitch.community.forum.dto.ForumResponseDto;
import main.sswitch.community.forum.dto.ForumSearchDto;
import main.sswitch.community.forum.entity.Forum;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-20T20:39:08+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class ForumMapperImpl implements ForumMapper {

    @Override
    public Forum ForumPostDtoToForum(ForumPostDto forumPostDto) {
        if ( forumPostDto == null ) {
            return null;
        }

        Forum forum = new Forum();

        forum.setForumTitle( forumPostDto.getForumTitle() );
        forum.setForumText( forumPostDto.getForumText() );
        forum.setGenre( forumPostDto.getGenre() );
        forum.setSecret( forumPostDto.getSecret() );

        return forum;
    }

    @Override
    public Forum ForumPatchDtoToForum(ForumPatchDto forumPatchDto) {
        if ( forumPatchDto == null ) {
            return null;
        }

        Forum forum = new Forum();

        forum.setForumId( forumPatchDto.getForumId() );
        forum.setForumTitle( forumPatchDto.getForumTitle() );
        forum.setForumText( forumPatchDto.getForumText() );
        forum.setForumLike( forumPatchDto.getForumLike() );
        forum.setGenre( forumPatchDto.getGenre() );
        forum.setSecret( forumPatchDto.getSecret() );

        return forum;
    }

    @Override
    public Forum ForumSearchDtoToForum(ForumSearchDto forumSearchDto) {
        if ( forumSearchDto == null ) {
            return null;
        }

        Forum forum = new Forum();

        forum.setForumId( forumSearchDto.getForumId() );
        forum.setForumTitle( forumSearchDto.getForumTitle() );
        forum.setGenre( forumSearchDto.getGenre() );
        forum.setSecret( forumSearchDto.getSecret() );

        return forum;
    }

    @Override
    public List<ForumResponseDto> ForumsToForumsResponseDto(List<Forum> forums) {
        if ( forums == null ) {
            return null;
        }

        List<ForumResponseDto> list = new ArrayList<ForumResponseDto>( forums.size() );
        for ( Forum forum : forums ) {
            list.add( forumToForumResponseDto( forum ) );
        }

        return list;
    }
}
