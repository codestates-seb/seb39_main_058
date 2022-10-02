package main.sswitch.boards.news.notice.dto;

import lombok.*;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;


@Getter
@Setter
public class NoticeResponseDto {
    private long userId;
    private String userName;

    private long noticeId;

    private String noticeTitle;

    private String noticeText;
    private LocalDateTime dateCreated;

    public void getDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void getUserId(User user) {
        this.userId = user.getUserId();
    }

    public void getUserName(User user) {
        this.userName = user.getUserName();
    }

}
