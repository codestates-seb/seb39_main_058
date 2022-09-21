package main.sswitch.community.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class CommentPostDto {

    @Positive
    private long userId;

    @Positive
    private long forumId;

    @Valid
    @NotNull
    private String commentText;
}
