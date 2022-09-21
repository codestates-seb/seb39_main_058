package main.sswitch.news.notice.entity;

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
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long noticeId;

//    @ManyToOne
//    @JoinColumn(name = "USER_ID")
//    public User user


    @Column(length = 255, nullable = false)
    public String noticeTitle;

    @Column(length = 20000, nullable = false)
    public String noticeText;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_ID")
//    public User user
}
