package main.sswitch.boards.news.event.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class EventPostDto {

    private long userId;

    @NotBlank
    private String eventTitle;

    @NotBlank
    private String eventText;

    @Nullable
    private String imagePath;

    public User getUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }
}
