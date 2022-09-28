package main.sswitch.user.entity;

//<<<<<<< HEAD
import lombok.*;
//=======
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.news.notice.entity.Notice;
import main.sswitch.help.audit.BaseEntity;
//>>>>>>> f45e06a21bed2814f3f8f00d852d215ec47bb450

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "USER")
@AllArgsConstructor
public class User extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private Integer point;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private UserStatus userStatus = UserStatus.USER_EXIST;

    @Column(nullable = false, name = "ROLE")
    private String role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "PROVIDERS")
    private Providers providers;

    @OneToMany(mappedBy = "user",cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    private List<Forum> forums = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Notice> notices = new ArrayList<>();

    boolean enabled = false;
    @Builder
    public User(Long userId, String loginId, String password, String userName, String email, Integer point, UserStatus userStatus, String role, Providers providers) {
        this.userId = userId;
        this.loginId = loginId;
        this.password = password;
        this.userName = userName;
        this.email = email;
        this.point = point;
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


// XSS 공격 방지용
    public void removeTag() {
        this.loginId = this.loginId.replaceAll("<", "&lt;");
        this.password = this.password.replaceAll(">", "&gt;");
        this.userName = this.userName.replaceAll("<", "&lt;");
        this.email = this.email.replaceAll(">", "&gt;");
    }
}
