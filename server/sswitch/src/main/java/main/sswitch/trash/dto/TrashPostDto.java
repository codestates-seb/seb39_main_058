package main.sswitch.trash.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.trash.entity.TrashCan;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class TrashPostDto {

    @NotBlank
    private String longitude;

    @NotBlank
    private String latitude;

    @NotNull
    private long userId;

    private TrashCan.TrashStatus trashStatus;

    @NotBlank
    private String address;


}
