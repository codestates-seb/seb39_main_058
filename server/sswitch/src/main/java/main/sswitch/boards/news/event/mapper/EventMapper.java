package main.sswitch.boards.news.event.mapper;

import main.sswitch.boards.news.event.dto.EventPatchDto;
import main.sswitch.boards.news.event.dto.EventPostDto;
import main.sswitch.boards.news.event.dto.EventResponseDto;
import main.sswitch.boards.news.event.entity.Event;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface EventMapper {

    Event EventPostDtoToEvent(EventPostDto eventPostDto);

    Event EventPatchDtoToEvent(EventPatchDto eventPatchDto);

//    EventResponseDto EventToEventResponseDto(Event event);

    List<EventResponseDto> EventsToEventsResponseDto(List<Event> events);

    default EventResponseDto EventToEventResponseDto(Event event) {
        EventResponseDto eventResponseDto = new EventResponseDto();

        eventResponseDto.setUserId(event.getUser().getUserId());
        eventResponseDto.setUserName(event.getUser().getUserName());
        eventResponseDto.setEventId(event.getEventId());
        eventResponseDto.setEventTitle(event.getEventTitle());
        eventResponseDto.setEventText(event.getEventText());
//        eventResponseDto.setDateCreated(event.getDateCreated());
        eventResponseDto.setDateCreated(event.getDateCreated());

        return eventResponseDto;
    }

//    default List<EventResponseDto> EventsToEventsResponseDto(List<Event> events) {
//        return events
//                .stream()
//                .map(event -> EventResponseDto
//                        .builder()
//                        .eventId(event.getEventId())
//                        .eventTitle(event.getEventTitle())
//                        .userName(event.getUser().getUserName())
//                        .dateCreated(event.getDateCreated())
//                        .dateModified(event.getDateModified())
//                        .build())
//                .collect(Collectors.toList());
//    }

}
