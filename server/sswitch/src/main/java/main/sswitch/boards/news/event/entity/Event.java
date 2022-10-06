package main.sswitch.boards.news.event.entity;

import lombok.*;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "EVENT")
public class Event extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long eventId;

    @Column(length = 255, nullable = false)
    private String eventTitle;

    @Column(columnDefinition = "text", nullable = false)
    private String eventText;

    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private String imagePath;

    public void setUser(User user) {
        this.user = user;
    }
}
