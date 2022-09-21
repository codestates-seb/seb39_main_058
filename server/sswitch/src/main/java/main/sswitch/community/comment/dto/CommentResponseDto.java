package main.sswitch.community.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponseDto {

    private long commnetId;

    private String commentText;

    private long userId;

    private long forumId;
}
