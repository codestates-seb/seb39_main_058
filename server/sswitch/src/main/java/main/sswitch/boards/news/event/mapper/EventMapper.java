package main.sswitch.boards.news.event.mapper;

import main.sswitch.boards.news.event.dto.EventPatchDto;
import main.sswitch.boards.news.event.dto.EventPostDto;
import main.sswitch.boards.news.event.dto.EventResponseDto;
import main.sswitch.boards.news.event.entity.Event;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {

    Event EventPostDtoToEvent(EventPostDto eventPostDto);

    Event EventPatchDtoToEvent(EventPatchDto eventPatchDto);

    EventResponseDto EventToEventResponseDto(Event event);

    List<EventResponseDto> EventsToEventsResponseDto(List<Event> events);
}
