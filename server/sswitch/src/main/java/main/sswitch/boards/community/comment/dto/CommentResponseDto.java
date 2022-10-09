package main.sswitch.boards.community.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class CommentResponseDto {

    private long commnetId;

    private String commentText;

    private long userId;

    private String userName;
    private long forumId;

    private LocalDateTime dateCreated;

    public void setUser(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
    }

    public void setForum(Forum forum) {
        this.forumId = forum.getForumId();
    }
}
