package main.sswitch.trash.dto;

import lombok.Getter;
import main.sswitch.trash.entity.TrashCan;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class TrashPatchDto {

    private long trashId;

    @Pattern(regexp = "^[0-9.]*$",message = "경도는 숫자와 . 만 입력할 수 있습니다.")
    @NotNull
    private String longitude;

    @Pattern(regexp = "^[0-9.]*$",message = "경도는 숫자와 . 만 입력할 수 있습니다.")
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
