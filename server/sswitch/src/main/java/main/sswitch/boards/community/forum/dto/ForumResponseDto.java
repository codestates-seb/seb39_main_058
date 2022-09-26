package main.sswitch.boards.community.forum.dto;

import lombok.*;
import main.sswitch.boards.community.comment.dto.CommentResponseDto;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ForumResponseDto {

    private Long forumId;

    private Forum.Tag tag;

    private Forum.Secret secret;

    private String forumTitle;

    private String forumText;

    private long forumLike;

    private LocalDateTime dateCreated;

    private LocalDateTime dateModified;

    private String userName;

    public List<CommentResponseDto> commentResponses;

    public void getUser(User user) {
        this.userName = user.getUserName();
    }
    public void getDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void getDateModified(LocalDateTime dateModified) {
        this.dateModified = dateModified;
    }

    public String getForumTag(){
        return tag.getTag();
    }

    public String getForumSecret(){
        return secret.getSecret();
    }
}
