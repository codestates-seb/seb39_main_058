package main.sswitch.boards.community.forum.dto;

import lombok.Getter;
import main.sswitch.boards.community.forum.entity.Forum;

import javax.validation.constraints.NotNull;


// SQL injection protection 필요

@Getter
public class ForumPostDto {

    @NotNull
    private String forumTitle;

    @NotNull
    private String forumText;

    private Forum.Tag tag;

    private Forum.Secret secret;

}
