package main.sswitch.boards.community.comment.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.user.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
public class CommentPostDto {

    @Positive @NotNull
    private long userId;

    @Positive
    private long forumId;

    @NotNull
    private String commentText;

    public User getUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }

    public Forum getForum() {
        Forum forum = new Forum();
        forum.setForumId(forumId);
        return forum;
    }
}
