package main.sswitch.boards.news.event.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class EventPostDto {

    private String loginId;

    @NotBlank
    private String eventTitle;

    @NotBlank
    private String eventText;

    public User getUser() {
        User user = new User();
        user.setLoginId(loginId);
        return user;
    }
}
