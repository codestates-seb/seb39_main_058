package main.sswitch.community.forum.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class LikeForumDto {
    @Positive
    private long forumId;

    @Positive
    private long userId;
}
