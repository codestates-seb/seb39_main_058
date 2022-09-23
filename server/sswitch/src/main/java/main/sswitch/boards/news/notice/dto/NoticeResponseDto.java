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
    private LocalDateTime dateCreated;
    private LocalDateTime dateModified;

    public void getDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void getDateModified(LocalDateTime dateModified) {
        this.dateModified = dateModified;
    }

    public void setUser(User user) {
        this.username = user.getUserName();
    }

}
