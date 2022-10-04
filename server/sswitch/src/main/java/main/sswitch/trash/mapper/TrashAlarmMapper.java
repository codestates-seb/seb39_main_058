package main.sswitch.trash.mapper;

import lombok.RequiredArgsConstructor;
import main.sswitch.trash.dto.TrashCanAlarmDto;
import main.sswitch.trash.entity.TrashCanAlarm;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TrashAlarmMapper {
    public TrashCanAlarmDto.Response alarmToTrashAlarmResponseDto(TrashCanAlarm trashCanAlarm) {
        TrashCanAlarmDto.Response response = TrashCanAlarmDto.Response
                .builder()
                .trashCanAlarmId(trashCanAlarm.getTrashCanAlarmId())
                .trashId(trashCanAlarm.getTrashCan().getTrashId())
                .userId(trashCanAlarm.getUser().getUserId())
                .userName(trashCanAlarm.getUser().getUserName())
                .currentPoints(trashCanAlarm.getUser().getCurrentPoints())
                .totalPoints(trashCanAlarm.getUser().getTotalPoints())
                .createdAt(trashCanAlarm.getDateCreated())
                .build();
        return response;
    }
}
