package main.sswitch.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.news.notice.entity.Notice;
import main.sswitch.help.audit.BaseEntity;

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
public class User extends BaseEntity {
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

//    @Column(nullable = false)
//    private Integer point;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private UserStatus userStatus = UserStatus.USER_EXIST;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "ROLE")
    private UserRole role = UserRole.ROLE_GUEST;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "PROVIDERS")
    private Providers providers;

//    @OneToMany(mappedBy = "user")
//    private List<Forum> forums = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Comment> comments = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Notice> notices = new ArrayList<>();

    boolean enabled = false;

    public User(String loginId, String password, String userName, String email) {
        this.loginId = loginId;
        this.password = password;
        this.userName = userName;
        this.email = email;
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

    public enum UserRole {
        ROLE_ADMIN("관리자 계정"),
        ROLE_USER("회원 계정"),
        ROLE_GUEST("게스트 계정");

        @Getter
        @Setter
        private String role;

        UserRole(String role) {
            this.role = role;
        }

        public List<String> getRoleList() {
            if (this.role.length() > 0) {
                return Arrays.asList(this.role.split(","));
            }
            return new ArrayList<>();
        }
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

}
