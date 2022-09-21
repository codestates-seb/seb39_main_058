package main.sswitch.trash.dto;

import lombok.Builder;
import lombok.Getter;
import main.sswitch.trash.entity.TrashCan;

import java.time.LocalDateTime;

@Builder
@Getter
public class TrashResponseDto {
    private long trashId;

    private String longitude;

    private String latitude;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private TrashCan.TrashStatus trashStatus;

    public String getTrashStatus() {
        return trashStatus.getStatus();
    }
}
