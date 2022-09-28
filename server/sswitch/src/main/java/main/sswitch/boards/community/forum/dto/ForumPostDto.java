package main.sswitch.boards.community.forum.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.user.entity.User;
import main.sswitch.user.service.UserService;

import javax.validation.constraints.NotNull;


// SQL injection protection 필요

@Getter
@Setter
@NoArgsConstructor
public class ForumPostDto {

    private UserService userService;

    public ForumPostDto(UserService userService) {
        this.userService = userService;
    }
    private long userId;

    @NotNull
    private String forumTitle;

    @NotNull
    private String forumText;

    private String tag;

    private Forum.Secret secret;

//    @NotNull
//    private String loginId;

//    public User getUser(long userId) {
//        User user = userService.findUserWithId(userId);
//        return user;
//    }

    public User getUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }

}
