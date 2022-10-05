package main.sswitch.trash.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@Setter
public class TrashCanAlarmDto {
    private Long trashId;
    private Long userId;
    private String userName;

    @Getter
    @Builder
    @AllArgsConstructor
    @Setter
    public static class Response{
        private Long trashCanAlarmId;
        private Long trashId;
        private Long userId;
        private String userName;
        private LocalDateTime createdAt;
        private int currentPoints;
        private int totalPoints;

    }
}
