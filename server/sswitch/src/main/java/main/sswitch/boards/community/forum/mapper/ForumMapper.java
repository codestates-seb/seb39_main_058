package main.sswitch.boards.community.forum.mapper;

import main.sswitch.boards.community.comment.dto.CommentResponseDto;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.forum.dto.ForumPatchDto;
import main.sswitch.boards.community.forum.dto.ForumPostDto;
import main.sswitch.boards.community.forum.dto.ForumResponseDto;
import main.sswitch.boards.community.forum.dto.ForumSearchDto;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.help.audit.BaseEntity;
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
        List<Comment> comments = forum.getComments();

        ForumResponseDto forumResponseDto = new ForumResponseDto();
        forumResponseDto.setForumId(forum.getForumId());
        forumResponseDto.setForumTitle(forum.getForumTitle());
        forumResponseDto.setForumText(forum.getForumText());
        forumResponseDto.setForumLike(forum.getForumLike());
        forumResponseDto.setTag(forum.getTag());
        forumResponseDto.setSecret(forum.getSecret());
        forumResponseDto.setCommentResponses(
                commentsToForumResponseDto(comments)
        );

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

    default List<CommentResponseDto> commentsToForumResponseDto(List<Comment> comments) {
        return comments
                .stream()
                .map(comment -> CommentResponseDto
                        .builder()
                        .forumId(comment.getForum().getForumId())
                        .userId(comment.getUser().getUserId())
                        .commnetId(comment.getCommentId())
                        .commentText(comment.getCommentText())
                        .build())
                .collect(Collectors.toList());
    }
}
