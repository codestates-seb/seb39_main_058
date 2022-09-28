package main.sswitch.boards.community.comment.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.user.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CommentPatchDto {

    private long commentId;

    @NotNull
    private String commentText;

    @NotNull
    private long userId;

    @NotNull
    private long forumId;

//    public void setUserId(User user) {
//        this.userId = user.;
//    }

}
