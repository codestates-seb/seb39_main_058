package main.sswitch.trash.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.trash.entity.TrashCan;

import java.time.LocalDateTime;

//@Builder
@Getter
@Setter
public class TrashResponseDto {
    private long trashId;

    private String longitude;

    private String latitude;

    private LocalDateTime dateCreated;

    private LocalDateTime dateModified;

    private TrashCan.TrashStatus trashStatus;

    private long userId;


    public void getDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void getDateModified(LocalDateTime dateModified) {
        this.dateModified = dateModified;
    }
    public String getTrashStatus() {
        return trashStatus.getStatus();
    }
}
