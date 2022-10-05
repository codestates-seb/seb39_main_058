package main.sswitch.boards.news.event.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class EventPatchDto {

    private long userId;

    private long eventId;

    @NotBlank
    private String eventTitle;

    @NotBlank
    private String eventText;

    private String imagePath;

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }
}
