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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private String address;


//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "TRASH_ID")
//    private TrashCan trashCan;

    private int trashStatus = 1;


    public void setUser(User user) {
        this.user = user;
    }

//    public void setTrashCan(TrashCan trashCan) {
//        this.trashCan = trashCan;
//    }

    public enum TrashAlarmStatus {
        TRASH_CAN_FULL("FULL"),
        TRASH_CAN_EMPTY("EMPTY"),
        ;

        @Getter
        @Setter
        private String status;

        TrashAlarmStatus(String status) {
            this.status = status;
        }
    }
}
