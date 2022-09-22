package main.sswitch.boards.trash.dto;

import lombok.Getter;
import main.sswitch.boards.trash.entity.TrashCan;

import javax.validation.constraints.NotBlank;

@Getter
public class TrashPostDto {

    @NotBlank
    private String longitude;

    @NotBlank
    private String latitude;

    private TrashCan.TrashStatus trashStatus;

}
