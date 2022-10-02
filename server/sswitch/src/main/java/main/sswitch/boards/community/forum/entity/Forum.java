package main.sswitch.boards.community.forum.entity;

import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@Table(name = "FORUM")
public class Forum extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long forumId;

    @Column(columnDefinition = "text", nullable = false)
    private String forumTitle;

    @Column(columnDefinition = "text", nullable = false)
    private String forumText;

    @Column(nullable = false)
    private long forumLike;

    //    private Tag tag = Tag.구로구;
//    @Enumerated(value = EnumType.STRING)
    @Column(columnDefinition = "text", nullable = false)
    private String tag;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Secret secret = Secret.OPEN;

    @OneToMany(mappedBy = "forum", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "forum", cascade = CascadeType.REMOVE)
    private List<LikeForum> likeForums = new ArrayList<>();

//    public void addLikeForum(LikeForum likeForum) {
//        this.likeForums.get(likeForum);
//        if (likeForum.getForum() != this) {
//            likeForum.addForum(this);
//        }
//    }

    //유저와 게시글을 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    //게시판 작성시에 분류해주는 enum
//    public enum Tag {
//        구로구("구로구"),
//        강남구("강남구"),
//        동작구("동작구"),
//        관악구("관악구"),
//        마포구("마포구");
//
//        @Getter
//        @Setter
//        private String tag;
//
//        Tag(String tag) {
//            this.tag = tag;
//        }
//    }

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
