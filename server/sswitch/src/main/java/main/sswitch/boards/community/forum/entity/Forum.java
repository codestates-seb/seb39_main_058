package main.sswitch.boards.community.forum.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "FORUM")
public class Forum extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long forumId;

    @Column(length = 255, nullable = false)
    private String forumTitle;

    @Column(length = 20000, nullable = false)
    private String forumText;

    @Column(nullable = false)
    private long forumLike;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 255, nullable = false)
    private Tag tag = Tag.FREE_BOARD;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Secret secret = Secret.OPEN;

    @OneToMany(mappedBy = "forum")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "forum")
    private List<LikeForum> likeForums = new ArrayList<>();

//    public void addLikeForum(LikeForum likeForum) {
//        this.likeForums.get(likeForum);
//        if (likeForum.getForum() != this) {
//            likeForum.addForum(this);
//        }
//    }

    //유저와 게시글을 매핑
    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    //게시판 작성시에 분류해주는 enum
    public enum Tag {
        FREE_BOARD("자유 게시판"),
        QNA("자주 묻는 질문"),
        ASK("건의사항"),
        REPORT("신고"),
        ;

        @Getter
        @Setter
        private String tag;

        Tag(String tag) {
            this.tag = tag;
        }
    }

    //게시판 작성시 비밀글인지 공개글인지 전환해주는 enum
    public enum Secret {
        OPEN("공개글"),
        SECRET("비밀글");

        @Getter
        @Setter
        private String secret;

        Secret(String secret){
            this.secret = secret;
        }
    }

}