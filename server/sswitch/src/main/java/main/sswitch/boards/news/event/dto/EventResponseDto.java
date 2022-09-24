package main.sswitch.boards.news.event.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventResponseDto {

    private String userName;

    private long eventId;

    private String eventTitle;

    private String eventText;

    private LocalDateTime dateCreated;

    private LocalDateTime dateModified;

    public void getDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void getDateModified(LocalDateTime dateModified) {
        this.dateModified = dateModified;
    }
    private void setUser(User user) {
        this.userName = user.getUserName();
    }
}
