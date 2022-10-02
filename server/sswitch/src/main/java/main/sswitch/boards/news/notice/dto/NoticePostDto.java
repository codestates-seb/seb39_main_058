package main.sswitch.boards.news.notice.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;


@Getter
@Setter
public class NoticePostDto {
    private long userId;

    @NotBlank
    private String noticeTitle;

    @NotBlank
    private String noticeText;

    public User getUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }

}
