package main.sswitch.user.entity;


import lombok.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.news.notice.entity.Notice;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.order.entity.Order;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "USER")
@AllArgsConstructor
@Builder
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private UserStatus userStatus = UserStatus.USER_EXIST;

    @Column(nullable = false, name = "ROLE")
    private String role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "PROVIDERS")
    private Providers providers;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<Order> orders = new ArrayList<>();


//    @OneToMany(mappedBy = "user")
//    private List<Forum> forums = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Comment> comments = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Notice> notices = new ArrayList<>();

    boolean enabled = false;
    @Builder
    public User(Long userId, String loginId, String password, String userName, String email, UserStatus userStatus, String role, Providers providers) {
        this.userId = userId;
        this.loginId = loginId;
        this.password = password;
        this.userName = userName;
        this.email = email;
        this.userStatus = userStatus;
        this.role = role;
        this.providers = providers;
    }


    public enum UserStatus {
        USER_NOT_EXIST("지금 입력하신 회원은 존재하지 않습니다"),
        USER_EXIST("이미 존재하는 회원입니다");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }

        public List<String> getRoleList() {
            if (this.role.length() > 0) {
                return Arrays.asList(this.role.split(","));
            }
            return new ArrayList<>();
        }

    public enum Providers {
        PROVIDER_GOOGLE("구글"),
        PROVIDER_KAKAO("카카오"),
        PROVIDER_SSWITCH("쓰위치");

        @Getter
        private String providers;

        Providers(String providers) {
            this.providers = providers;
        }
    }

    public void addOrder(Order order){
        orders.add(order);
        if(order.getUser() != this){
            order.changeUser(this);
        }
    }


// XSS 공격 방지용
    public void removeTag() {
        this.loginId = this.loginId.replaceAll("<", "&lt;");
        this.password = this.password.replaceAll(">", "&gt;");
        this.userName = this.userName.replaceAll("<", "&lt;");
        this.email = this.email.replaceAll(">", "&gt;");
    }
}
