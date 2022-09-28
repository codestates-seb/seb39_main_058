package main.sswitch.boards.community.forum.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.boards.community.forum.entity.Forum;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ForumPatchDto {
    @NotNull
    private long userId;

    private long forumId;

    @NotNull
    private String forumTitle;

    @NotNull
    private String forumText;

    private long forumLike;

    private String tag;
//    private Forum.Tag tag;

    private Forum.Secret secret;

//    private String username;

}
