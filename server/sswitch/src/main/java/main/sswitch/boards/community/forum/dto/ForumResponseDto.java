package main.sswitch.boards.community.forum.dto;

import lombok.*;
import main.sswitch.boards.community.comment.dto.CommentResponseDto;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.comment.entity.Comment;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ForumResponseDto {

    public Long forumId;

    public Forum.Tag tag;

    public Forum.Secret secret;

    public String forumTitle;

    public String forumText;

    public long forumLike;

    public LocalDateTime createdAt;

    public LocalDateTime modifiedAt;

    private long userId;

    public List<CommentResponseDto> commentResponses;

    public String getForumTag(){
        return tag.getTag();
    }

    public String getForumSecret(){
        return secret.getSecret();
    }
}