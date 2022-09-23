package main.sswitch.boards.news.event.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "EVENT")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long eventId;

    @Column(length = 255, nullable = false)
    private String eventTitle;

    @Column(columnDefinition = "text", nullable = false)
    private String eventText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setUser(User user) {
        this.user = user;
    }
}
