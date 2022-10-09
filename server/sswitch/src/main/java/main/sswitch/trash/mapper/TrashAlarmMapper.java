//package main.sswitch.trash.mapper;
//
//import lombok.RequiredArgsConstructor;
//import main.sswitch.trash.dto.TrashCanAlarmDto;
//import main.sswitch.trash.dto.TrashPostDto;
//import main.sswitch.trash.entity.TrashCan;
//import main.sswitch.trash.entity.TrashCanAlarm;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class TrashAlarmMapper {
//
//    public TrashCanAlarmDto.Response alarmToTrashAlarmResponseDto(TrashCanAlarm trashCanAlarm) {
//        TrashCanAlarmDto.Response response = TrashCanAlarmDto.Response
//                .builder()
//                .trashCanAlarmId(trashCanAlarm.getTrashCanAlarmId())
//                .userId(trashCanAlarm.getUser().getUserId())
//                .address(trashCanAlarm.getAddress())
//                .createdAt(trashCanAlarm.getDateCreated())
//                .build();
//        return response;
//    }
//}
