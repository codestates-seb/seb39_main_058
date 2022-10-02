package main.sswitch.boards.community.likeForum.mapper;

import main.sswitch.boards.community.likeForum.dto.LikeForumResponseDto;
import main.sswitch.boards.community.likeForum.entity.LikeForum;
import main.sswitch.boards.community.likeForum.dto.LikeForumPostDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LikeForumMapper {
    public LikeForum LikeForumPostDtoToLikeForum(LikeForumPostDto likeForumPostDto);

    public LikeForumResponseDto LikeToLikeResponseDto(LikeForum likeForum);

    public List<LikeForumResponseDto> LikesToLikesResponseDto(List<LikeForum> likeForums);
}
