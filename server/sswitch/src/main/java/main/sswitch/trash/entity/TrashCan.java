package main.sswitch.trash.entity;

import lombok.*;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TRASHCAN")
public class TrashCan extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trashId;

    @Column(length = 255, nullable = false)
    private String longitude;

    @Column(length = 255, nullable = false)
    private String latitude;

    @Column(length = 255, nullable = false, unique = true)
    private String address;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

//    @OneToOne(mappedBy = "trashCan")
//    private TrashCanAlarm trashCanAlarm;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 255, nullable = false)
    private TrashStatus trashStatus = TrashStatus.TRASH_CAN_FULL;


    public void setUser(User user) {
        this.user = user;
    }

//    쓰레기통 상태
    public enum TrashStatus {
        TRASH_CAN_FULL("FULL"),
        TRASH_CAN_EMPTY("EMPTY"),
        ;

        @Getter
        @Setter
        private String status;

        TrashStatus(String status) {
            this.status = status;
        }
    }

}
