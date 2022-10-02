package main.sswitch.boards.community.likeForum.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class LikeForumPostDto {
    @Positive
    @NotBlank
    private long forumId;

    @Positive
    @NotBlank
    private long userId;

    public User setUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }
}
