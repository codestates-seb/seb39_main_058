package main.sswitch.boards.community.forum.mapper;

import main.sswitch.boards.community.comment.dto.CommentResponseDto;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.forum.dto.*;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.likeForum.dto.LikeForumResponseDto;
import main.sswitch.boards.community.likeForum.entity.LikeForum;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ForumMapper {

    Forum ForumPostDtoToForum(ForumPostDto forumPostDto);

    Forum ForumPatchDtoToForum(ForumPatchDto forumPatchDto);

    Forum ForumSearchDtoToForum(ForumSearchDto forumSearchDto);

//    ForumResponseDto ForumToForumResponseDto(Forum forum);

    //특정 게시글 반환 메서드
    default ForumResponseDto.GetResponse ForumToForumResponseDto(Forum forum) {
        List<Comment> comments = forum.getComments();
        List<LikeForum> likeForums = forum.getLikeForums();

        ForumResponseDto.GetResponse forumResponseDto = new ForumResponseDto.GetResponse();
        forumResponseDto.setUserId(forum.getUser().getUserId());
        forumResponseDto.setForumId(forum.getForumId());
        forumResponseDto.setForumTitle(forum.getForumTitle());
        forumResponseDto.setForumText(forum.getForumText());
        forumResponseDto.setForumLike(forum.getForumLike());
        forumResponseDto.setUserName(forum.getUser().getUserName());
        forumResponseDto.setTag(forum.getTag());
        forumResponseDto.setSecret(forum.getSecret());
        forumResponseDto.setDateCreated(forum.getDateCreated());
        forumResponseDto.setDateModified(forum.getDateModified());
        forumResponseDto.setCommentResponses(
                commentsToForumResponseDto(comments)
        );
        forumResponseDto.setLikeForumResponses(
                likesToForumResponseDto(likeForums)
        );

        return forumResponseDto;
    }

    // 게시글 목록을 반환하는 메서드
//    default ForumResponseDto ForumToForumResponseDto(Forum forum) {
//        ForumResponseDto forumResponseDto = new ForumResponseDto();
//
//        forumResponseDto.setUserName(forum.getUser().getUserName());
//        forumResponseDto.setForumId(forum.getForumId());
//        forumResponseDto.setForumTitle(forum.getForumTitle());
//        forumResponseDto.setDateModified(forum.getDateModified());
//        forumResponseDto.setForumLike(forum.getForumLike());
//        forumResponseDto.setTag(forum.getTag());
//
//        return forumResponseDto;
//    }
    default List<ForumResponseDto.ResponseList> ForumsToForumsResponseDto(List<Forum> forums) {
        return forums
                .stream()
                .map(forum -> ForumResponseDto.ResponseList
                        .builder()
                        .forumId(forum.getForumId())
                        .forumTitle(forum.getForumTitle())
                        .tag(forum.getTag())
                        .secret(forum.getSecret())
                        .userId(forum.getUser().getUserId())
                        .userName(forum.getUser().getUserName())
                        .forumLike(forum.getForumLike())
                        .dateModified(forum.getDateModified())
                        .build())
                .collect(Collectors.toList());
    }

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
                        .userName(comment.getUser().getUserName())
                        .commnetId(comment.getCommentId())
                        .commentText(comment.getCommentText())
                        .dateCreated(comment.getDateCreated())
                        .build())
//                .filter()
                .collect(Collectors.toList());
    }

    default List<LikeForumResponseDto> likesToForumResponseDto(List<LikeForum> likeForums) {
        return likeForums
                .stream()
                .map(likeForum -> LikeForumResponseDto
                        .builder()
                        .likeForumId(likeForum.getLikeForumId())
                        .forumId(likeForum.getForum().getForumId())
                        .userId(likeForum.getUser().getUserId())
                        .build())
                .collect(Collectors.toList());
    }
}
