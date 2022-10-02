package main.sswitch.boards.community.likeForum.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LikeForumResponseDto {
    private long likeForumId;
    private long forumId;
    private long userId;
}
