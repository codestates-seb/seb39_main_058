package main.sswitch.boards.community.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Builder
public class CommentResponseDto {

    private long commnetId;

    private String commentText;

    private long userId;
    private long forumId;

    private LocalDateTime dateCreated;

    private LocalDateTime dateModified;

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setDateModified(LocalDateTime dateModified) {
        this.dateModified = dateModified;
    }

    public void setUser(User user) {
        this.userId = user.getUserId();
    }

    public void setForum(Forum forum) {
        this.forumId = forum.getForumId();
    }
}
