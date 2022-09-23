package main.sswitch.boards.news.event.repository;

import main.sswitch.boards.news.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
