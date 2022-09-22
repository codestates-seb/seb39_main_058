package main.sswitch.boards.trash.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.trash.entity.TrashCan;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class TrashStatusDto {
    private long trashId;

    @NotNull
    private TrashCan.TrashStatus trashStatus;


}
