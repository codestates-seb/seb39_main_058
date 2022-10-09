//package main.sswitch.trash.entity;
//
//import lombok.*;
//import main.sswitch.help.audit.BaseEntity;
//import main.sswitch.user.entity.User;
//
//import javax.persistence.*;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Builder
//@Table(name = "TRASHCAN_ALARM")
//public class TrashCanAlarm extends BaseEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long trashCanAlarmId;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_ID")
//    private User user;
//
//    private String address;
//
//
////    @OneToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name = "TRASH_ID")
////    private TrashCan trashCan;
//
//    @Enumerated(value = EnumType.STRING)
//    @Column(length = 255, nullable = false)
//    private TrashCanAlarm.TrashStatus trashStatus = TrashCanAlarm.TrashStatus.TRASH_CAN_FULL;
//
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
////    public void setTrashCan(TrashCan trashCan) {
////        this.trashCan = trashCan;
////    }
//
//    public enum TrashStatus {
//        TRASH_CAN_FULL("FULL"),
//        TRASH_CAN_EMPTY("EMPTY"),
//        ;
//
//        @Getter
//        @Setter
//        private String status;
//
//        TrashStatus(String status) {
//            this.status = status;
//        }
//    }
//}
