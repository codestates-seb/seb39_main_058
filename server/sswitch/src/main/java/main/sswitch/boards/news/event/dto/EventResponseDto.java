package main.sswitch.boards.news.event.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;

@Getter
@Setter
public class EventResponseDto {

    private String userName;

    private long eventId;

    private String eventTitle;

    private String eventText;

    private void setUser(User user) {
        this.userName = user.getUserName();
    }
}
