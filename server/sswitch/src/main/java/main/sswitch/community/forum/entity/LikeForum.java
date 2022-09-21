package main.sswitch.community.forum.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class LikeForum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeForumId;

    @ManyToOne
    @JoinColumn(name = "FORUM_ID")
    private Forum forum;

    //유저와 매핑
//    @ManyToOne
//    @JoinColumn(name = "USER_ID")
//    private User user;

    public void addForum(Forum forum) {
        this.forum = forum;
        if (!this.forum.getLikeForums().contains(this)) {
            this.forum.getLikeForums().add(this);
        }
    }

    //유저에 더하는 내용
//    public void addUser(User user) {
//        this.user = user;
//        if (!this.user.getLikeForum().contains(this)) {
//            this.user.addLikeForum(this);
//        }
//    }
}
