package main.sswitch.trash.dto;

import lombok.Getter;
import main.sswitch.trash.entity.TrashCan;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class TrashPostDto {

    @NotBlank
    private String longitude;

    @NotBlank
    private String latitude;

    @NotNull
    private long userId;

    private TrashCan.TrashStatus trashStatus;

    public User getUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }

}
