package main.sswitch.community.forum.dto;

import lombok.Getter;
import main.sswitch.community.forum.entity.Forum;

import javax.validation.constraints.NotNull;


// SQL injection protection 필요

@Getter
public class ForumPostDto {

    @NotNull
    private String forumTitle;

    @NotNull
    private String forumText;

    private Forum.Genre genre;

    private Forum.Secret secret;

}
