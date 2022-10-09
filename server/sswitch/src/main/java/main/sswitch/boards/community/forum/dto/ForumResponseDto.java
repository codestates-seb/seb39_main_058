package main.sswitch.boards.community.forum.dto;

import lombok.*;
import main.sswitch.boards.community.comment.dto.CommentResponseDto;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.likeForum.dto.LikeForumResponseDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

public class ForumResponseDto {
    @Getter
    @Setter
    public static class GetResponse {

        private Long forumId;

        private String forumTitle;

        private String forumText;

        private String tag;
        private Forum.Secret secret;

        private long forumLike;
        private long userId;

        private String userName;

        private LocalDateTime dateCreated;

        private LocalDateTime dateModified;
        private long commentCount;

        public List<CommentResponseDto> commentResponses;

        public List<LikeForumResponseDto> likeForumResponses;

        public void setDateCreated(LocalDateTime dateCreated) {
            this.dateCreated = dateCreated;
        }

        public void setDateModified(LocalDateTime dateModified) {
            this.dateModified = dateModified;
        }

        public void setUser(User user) {
            this.userId = user.getUserId();
            this.userName = user.getUserName();
        }


    }
    @Getter
    @Builder
    @Setter
    @AllArgsConstructor
    public static class ResponseList {
        private Long forumId;

        private String forumTitle;

        private String tag;

        private Forum.Secret secret;

        private long userId;

        private long commentCount;

        private String userName;

        private long forumLike;

        private LocalDateTime dateModified;
    }

}
