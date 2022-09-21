package main.sswitch.community.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CommentPatchDto {

    private long commentId;

    @NotNull
    private String commentText;

    private long userId;

    private long forumId;


}
