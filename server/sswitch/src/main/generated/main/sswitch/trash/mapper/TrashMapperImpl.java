package main.sswitch.trash.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import main.sswitch.trash.dto.TrashPatchDto;
import main.sswitch.trash.dto.TrashPostDto;
import main.sswitch.trash.dto.TrashResponseDto;
import main.sswitch.trash.dto.TrashStatusDto;
import main.sswitch.trash.entity.TrashCan;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-20T15:45:52+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class TrashMapperImpl implements TrashMapper {

    @Override
    public TrashCan trashPostDtoToTrash(TrashPostDto trashPostDto) {
        if ( trashPostDto == null ) {
            return null;
        }

        TrashCan trashCan = new TrashCan();

        trashCan.setLongitude( trashPostDto.getLongitude() );
        trashCan.setLatitude( trashPostDto.getLatitude() );
        trashCan.setTrashStatus( trashPostDto.getTrashStatus() );

        return trashCan;
    }

    @Override
    public TrashCan trashPatchDtoToTrash(TrashPatchDto trashPatchDto) {
        if ( trashPatchDto == null ) {
            return null;
        }

        TrashCan trashCan = new TrashCan();

        trashCan.setTrashId( trashPatchDto.getTrashId() );
        trashCan.setLongitude( trashPatchDto.getLongitude() );
        trashCan.setLatitude( trashPatchDto.getLatitude() );
        trashCan.setTrashStatus( trashPatchDto.getTrashStatus() );

        return trashCan;
    }

    @Override
    public TrashCan trashStatusChangeDtoToTrash(TrashStatusDto trashStatusDto) {
        if ( trashStatusDto == null ) {
            return null;
        }

        TrashCan trashCan = new TrashCan();

        trashCan.setTrashId( trashStatusDto.getTrashId() );
        trashCan.setTrashStatus( trashStatusDto.getTrashStatus() );

        return trashCan;
    }

    @Override
    public TrashResponseDto trashToTrashResponseDto(TrashCan trashCan) {
        if ( trashCan == null ) {
            return null;
        }

        TrashResponseDto.TrashResponseDtoBuilder trashResponseDto = TrashResponseDto.builder();

        if ( trashCan.getTrashId() != null ) {
            trashResponseDto.trashId( trashCan.getTrashId() );
        }
        trashResponseDto.longitude( trashCan.getLongitude() );
        trashResponseDto.latitude( trashCan.getLatitude() );
        trashResponseDto.trashStatus( trashCan.getTrashStatus() );

        return trashResponseDto.build();
    }

    @Override
    public List<TrashResponseDto> trashesToTrashResponseDto(List<TrashCan> trashCans) {
        if ( trashCans == null ) {
            return null;
        }

        List<TrashResponseDto> list = new ArrayList<TrashResponseDto>( trashCans.size() );
        for ( TrashCan trashCan : trashCans ) {
            list.add( trashToTrashResponseDto( trashCan ) );
        }

        return list;
    }
}
