package main.sswitch.community.forum.dto;

import lombok.Getter;
import lombok.Setter;
import main.sswitch.community.forum.entity.Forum;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ForumPatchDto {

    private long forumId;

    @NotNull
    private String forumTitle;

    @NotNull
    private String forumText;

    private long forumLike;

    private Forum.Genre genre;

    private Forum.Secret secret;

//    private String username;

}
