package main.sswitch.trash.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TRASHCAN")
public class TrashCan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trashId;

    @Column(length = 255, nullable = false)
    private String longitude;

    @Column(length = 255, nullable = false)
    private String latitude;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 255, nullable = false)
    private TrashStatus trashStatus = TrashStatus.TRASH_CAN_EMPTY;


//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_ID")
//    private long userId;
    //쓰레기통 등록, 수정, 삭제등의 권한
//    private String userRole;
//      jmeter로 성능테스트

    //쓰레기통 상태
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
