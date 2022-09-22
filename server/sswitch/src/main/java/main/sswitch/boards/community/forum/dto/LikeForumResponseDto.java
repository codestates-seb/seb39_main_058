package main.sswitch.boards.community.forum.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LikeForumResponseDto {
    private long forumId;
    private long userId;
}
