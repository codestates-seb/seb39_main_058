package main.sswitch.boards.news.notice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "NOTICE")
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long noticeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    public User user;


    @Column(length = 255, nullable = false)
    public String noticeTitle;

    @Column(length = 20000, nullable = false)
    public String noticeText;

    public void setUser(User user) {
        this.user = user;
    }
}
