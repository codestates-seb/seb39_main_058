package main.sswitch.boards.news.notice.dto;

import lombok.Builder;
import lombok.Getter;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@Builder
@Getter
public class NoticeResponseDto {
    private long noticeId;

    private String username;
    private String noticeTitle;
    private String noticeText;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setUser(User user) {
        this.username = user.getUserName();
    }

}
