package main.sswitch.boards.trash.mapper;

import main.sswitch.boards.trash.dto.TrashStatusDto;
import main.sswitch.boards.trash.dto.TrashPatchDto;
import main.sswitch.boards.trash.dto.TrashPostDto;
import main.sswitch.boards.trash.dto.TrashResponseDto;
import main.sswitch.boards.trash.entity.TrashCan;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TrashMapper {
    TrashCan trashPostDtoToTrash(TrashPostDto trashPostDto);

    TrashCan trashPatchDtoToTrash(TrashPatchDto trashPatchDto);

    TrashCan trashStatusChangeDtoToTrash(TrashStatusDto trashStatusDto);

    TrashResponseDto trashToTrashResponseDto(TrashCan trashCan);

    List<TrashResponseDto> trashesToTrashResponseDto(List<TrashCan> trashCans);
}
