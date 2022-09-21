package main.sswitch.community.forum.mapper;

import main.sswitch.community.forum.dto.*;
import main.sswitch.community.forum.entity.Forum;
import main.sswitch.community.forum.entity.LikeForum;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ForumMapper {
    Forum ForumPostDtoToForum(ForumPostDto forumPostDto);

    Forum ForumPatchDtoToForum(ForumPatchDto forumPatchDto);

    Forum ForumSearchDtoToForum(ForumSearchDto forumSearchDto);

//    ForumResponseDto ForumToForumResponseDto(Forum forum);

    default ForumResponseDto forumToForumResponseDto(Forum forum) {
        ForumResponseDto forumResponseDto = new ForumResponseDto();

        forumResponseDto.setForumId(forum.getForumId());
        forumResponseDto.setForumTitle(forum.getForumTitle());
        forumResponseDto.setForumText(forum.getForumText());
        forumResponseDto.setForumLike(forum.getForumLike());
        forumResponseDto.setGenre(forum.getGenre());
        forumResponseDto.setSecret(forum.getSecret());

        return forumResponseDto;
    }
    List<ForumResponseDto> ForumsToForumsResponseDto(List<Forum> forums);

//    List<ForumSearchDto> ForumSearchResponseDto(List<Forum> forums);

    //좋아요 누른 유저명단 모으기
//    default List<LikeForumResponseDto> likeForumsToLikeForumsResponseDto(
//            List<LikeForum> likeForums) {
//        return likeForums
//                .stream()
//                .map(likeForum -> LikeForumResponseDto
//                        .builder()
//                        .userId(likeForum.getUser().getUserId())
//                        .build())
//                .collect(Collectors.toList());
//    }
}
