package main.sswitch.boards.news.event.controller;

import lombok.extern.slf4j.Slf4j;
import main.sswitch.boards.news.event.dto.EventPatchDto;
import main.sswitch.boards.news.event.dto.EventPostDto;
import main.sswitch.boards.news.event.entity.Event;
import main.sswitch.boards.news.event.mapper.EventMapper;
import main.sswitch.boards.news.event.service.EventService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/news/event")
@Slf4j
@CrossOrigin("*")
public class EventController {

    private EventService eventService;
    private EventMapper mapper;

    public EventController(EventService eventService, EventMapper mapper) {
        this.eventService = eventService;
        this.mapper = mapper;
    }

    @PostMapping("/take/create")
    public ResponseEntity postEvent(@Valid @RequestBody EventPostDto eventPostDto,
                                    @Positive @RequestHeader long userId) {
        Event event = eventService.createEvent(mapper.EventPostDtoToEvent(eventPostDto),userId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.EventToEventResponseDto(event)),
                HttpStatus.CREATED
        );
    }

    @PatchMapping("/take/{event-id}")
    public ResponseEntity patchEvent(@PathVariable("event-id") long eventId,
                                     @Valid @RequestBody EventPatchDto eventPatchDto,
                                     @Positive @RequestHeader long userId) {

        eventPatchDto.setEventId(eventId);
        Event event = eventService.updateEvent(mapper.EventPatchDtoToEvent(eventPatchDto),userId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.EventToEventResponseDto(event)),
                HttpStatus.OK);
    }

    @GetMapping("/{event-id}")
    public ResponseEntity getEvent( @PathVariable("event-id") long eventId) {
        Event event = eventService.findEvent(eventId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.EventToEventResponseDto(event)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getEvents(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Event> pageEvents = eventService.findEvents(page -1, size);
        List<Event> events = pageEvents.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.EventsToEventsResponseDto(events), pageEvents),
                HttpStatus.OK);
    }

    @DeleteMapping("/take/{event-id}")
    public ResponseEntity deleteEvent( @PathVariable("event-id") long eventId,
                                       @Positive @RequestHeader long userId) {
        eventService.deleteEvent(eventId,userId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
