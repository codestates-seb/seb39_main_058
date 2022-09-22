package main.sswitch.boards.community.comment.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.user.entity.User;

@Getter
@Setter
public class CommentReturnDto {

    private long commnetId;

    private String commentText;

    private long userId;

    private long forumId;


    public void setUser(User user) {
        this.userId = user.getUserId();
    }

    public void setForum(Forum forum) {
        this.forumId = forum.getForumId();
    }
}
