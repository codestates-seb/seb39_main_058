package main.sswitch.boards.news.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class NoticeResponseDto {
    private long noticeId;

    private String userName;
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
        this.userName = user.getUserName();
    }
    //User가 특정되지 않아서 null값 반환하는듯
    

}
