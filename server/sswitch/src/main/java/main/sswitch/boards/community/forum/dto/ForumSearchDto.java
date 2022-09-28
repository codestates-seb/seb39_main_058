package main.sswitch.boards.community.forum.dto;

import lombok.Getter;
import main.sswitch.boards.community.forum.entity.Forum;

@Getter
public class ForumSearchDto {
    private long forumId;

    private String tag;

    private String forumTitle;

    private Forum.Secret secret;

}
