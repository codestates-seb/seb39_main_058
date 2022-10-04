package main.sswitch.boards.community.likeForum.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LikeForumDto {
    @NotNull
    private long forumId;

    @NotNull
    private long userId;

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
