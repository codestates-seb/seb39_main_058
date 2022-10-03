package main.sswitch.boards.community.likeForum.entity;

import lombok.*;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
@Table( name = "LIKE_FORUM")
public class LikeForum extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeForumId;

    @Column
    private Long likeForumNum;
    @ManyToOne
    @JoinColumn(name = "FORUM_ID")
    private Forum forum;

    //유저와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setUser(User user){
        this.user = user;
    }

    public void setForum(Forum forum) {
        this.forum = forum;
    }
//    public void addForum(Forum forum) {
//        this.forum = forum;
//        if (!this.forum.getLikeForums().contains(this)) {
//            this.forum.getLikeForums().add(this);
//        }
//    }

    //유저에 더하는 내용
//    public void addUser(User user) {
//        this.user = user;
//        if (!this.user.getLikeForum().contains(this)) {
//            this.user.addLikeForum(this);
//        }
//    }
}
