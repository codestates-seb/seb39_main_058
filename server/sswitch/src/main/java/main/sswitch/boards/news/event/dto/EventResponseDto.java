package main.sswitch.boards.news.event.dto;

import lombok.*;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventResponseDto {

    private long userId;
    private String userName;

    private long eventId;

    private String eventTitle;

    private String eventText;

    private String imagePath;
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
