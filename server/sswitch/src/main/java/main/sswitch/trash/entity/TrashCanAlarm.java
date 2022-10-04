package main.sswitch.trash.entity;

import lombok.*;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "TRASHCAN_ALARM")
public class TrashCanAlarm extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trashCanAlarmId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRASH_ID")
    private TrashCan trashCan;

    public void setUser(User user) {
        this.user = user;
    }

    public void setTrashCan(TrashCan trashCan) {
        this.trashCan = trashCan;
    }
}
