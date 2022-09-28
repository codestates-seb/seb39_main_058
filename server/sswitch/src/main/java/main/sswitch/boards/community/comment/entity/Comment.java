package main.sswitch.boards.community.comment.entity;

import lombok.*;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "COMMENT")
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(columnDefinition = "text", nullable = false)
    private String commentText;

    //User Table Mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;


    //Forum Table Mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FORUM_ID")
    private Forum forum;

    public void setUser(User user) {
        this.user = user;
    }

    public void setForum(Forum forum) {
        this.forum = forum;
    }
}