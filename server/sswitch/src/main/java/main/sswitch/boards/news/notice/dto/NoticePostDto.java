package main.sswitch.boards.news.notice.dto;

import lombok.Getter;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;


@Getter
public class NoticePostDto {
    @NotBlank
    private String noticeTitle;

    @NotBlank
    private String noticeText;

    private long userId;

    public User getUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }
}
