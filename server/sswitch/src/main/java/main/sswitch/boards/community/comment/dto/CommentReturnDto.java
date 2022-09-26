package main.sswitch.boards.community.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentReturnDto {

    private long commnetId;

    private String commentText;

    private String userName;

    private long forumId;

    private LocalDateTime dateCreated;

    private LocalDateTime dateModified;


    public void getUser(User user) {
        this.userName = user.getUserName();
    }

    public void setForum(Forum forum) {
        this.forumId = forum.getForumId();
    }
}
