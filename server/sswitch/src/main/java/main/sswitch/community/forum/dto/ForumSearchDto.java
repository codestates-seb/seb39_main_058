package main.sswitch.community.forum.dto;

import lombok.Getter;
import main.sswitch.community.forum.entity.Forum;

@Getter
public class ForumSearchDto {
    private long forumId;

    private Forum.Genre genre;

    private String forumTitle;

    private Forum.Secret secret;

}
