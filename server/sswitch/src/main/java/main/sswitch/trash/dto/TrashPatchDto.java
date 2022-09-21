package main.sswitch.trash.dto;

import lombok.Getter;
import lombok.Setter;
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

    public void setTrashId(long trashId) {
        this.trashId = trashId;
    }
}
