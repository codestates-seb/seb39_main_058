package main.sswitch.boards.news.event.service;

import main.sswitch.boards.news.event.entity.Event;
import main.sswitch.boards.news.event.repository.EventRepository;
import main.sswitch.boards.news.notice.entity.Notice;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.user.entity.User;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;

    public EventService(EventRepository eventRepository,
                        UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public Event createEvent(Event event,long userId) {
        verifyExistEvent(event.getEventId());

//        verifyUserRole(userId);

        Event saveEvent = eventRepository.save(event);

        return saveEvent;
    }

    public Event updateEvent(Event event, long userId) {
        Event findEvent = findVerifiedEvent(event.getEventId());

//        verifyUserRole(userId);

        Optional.ofNullable(event.getEventTitle())
                .ifPresent(eventTitle -> findEvent.setEventTitle(eventTitle));
        Optional.ofNullable(event.getEventText())
                .ifPresent(eventText -> findEvent.setEventText(eventText));

        return eventRepository.save(findEvent);
    }

    public Event findEvent(long eventId) {
        return findVerifiedEvent(eventId);
    }

    public Page<Event> findEvents(int page, int size) {
        return eventRepository.findAll(PageRequest.of(page, size,
                Sort.by("eventId").descending()));
    }

    public void deleteEvent(long eventId,long userId) {
        Event findEvent = findVerifiedEvent(eventId);
//        verifyUserRole(userId);

        eventRepository.delete(findEvent);
    }

    public Event findVerifiedEvent(long eventId) {
        Optional<Event> optionalEvent =
                eventRepository.findById(eventId);

        Event findEvent =
                optionalEvent.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.EVENT_NOT_FOUND));
        return findEvent;
    }

    public void verifyExistEvent(long eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        if (event.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        }
    }

    //작성자 권환 확인 메소드
    public void verifyUserRole(long userId) {
        User user = userService.findUserWithId(userId);
        String role = user.getRole();
        if (!(role == "ROLE_ADMIN")) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }
    }
}
