package main.sswitch.trash.dto;

import lombok.Getter;
import main.sswitch.trash.entity.TrashCan;

import javax.validation.constraints.NotNull;

@Getter
public class TrashPatchDto {

    private long trashId;

    @NotNull
    private String longitude;

    @NotNull
    private String latitude;

    @NotNull
    private TrashCan.TrashStatus trashStatus;

    private long userId;

    private String address;

    public void setTrashId(long trashId) {
        this.trashId = trashId;
    }
}
