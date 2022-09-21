package main.sswitch.community.forum.dto;

import lombok.*;
import main.sswitch.community.forum.entity.Forum;
import main.sswitch.community.comment.entity.Comment;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ForumResponseDto {

    public Long forumId;

    public Forum.Genre genre;

    public Forum.Secret secret;

    public String forumTitle;

    public String forumText;

    public long forumLike;

    public LocalDateTime createdAt;

    public LocalDateTime modifiedAt;

//    private Long userId;

    public List<Comment> comments;

    public String getForumGenre(){
        return genre.getGenre();
    }

    public String getForumSecret(){
        return secret.getSecret();
    }
}
