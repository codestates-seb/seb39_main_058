package main.sswitch.trash.mapper;

import main.sswitch.trash.dto.TrashStatusDto;
import main.sswitch.trash.dto.TrashPatchDto;
import main.sswitch.trash.dto.TrashPostDto;
import main.sswitch.trash.dto.TrashResponseDto;
import main.sswitch.trash.entity.TrashCan;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TrashMapper {
    TrashCan trashPostDtoToTrash(TrashPostDto trashPostDto);

    TrashCan trashPatchDtoToTrash(TrashPatchDto trashPatchDto);

    TrashCan trashStatusChangeDtoToTrash(TrashStatusDto trashStatusDto);

    default TrashResponseDto trashToTrashResponseDto(TrashCan trashCan) {

        TrashResponseDto trashResponseDto = new TrashResponseDto();
        trashResponseDto.setTrashId(trashCan.getTrashId());
        trashResponseDto.setLongitude(trashCan.getLongitude());
        trashResponseDto.setLatitude(trashCan.getLatitude());
        trashResponseDto.setUserId(trashCan.getUser().getUserId());
        trashResponseDto.setAddress(trashCan.getAddress());
        trashResponseDto.setTrashStatus(trashCan.getTrashStatus());
        trashResponseDto.setDateCreated(trashCan.getDateCreated());
        trashResponseDto.setDateModified(trashCan.getDateModified());

        return trashResponseDto;
    }

    List<TrashResponseDto> trashesToTrashResponseDto(List<TrashCan> trashCans);
}
