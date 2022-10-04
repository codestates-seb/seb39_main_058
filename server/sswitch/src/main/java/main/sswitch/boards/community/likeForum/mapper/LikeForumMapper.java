package main.sswitch.boards.community.likeForum.mapper;

import main.sswitch.boards.community.likeForum.dto.LikeForumResponseDto;
import main.sswitch.boards.community.likeForum.entity.LikeForum;
import main.sswitch.boards.community.likeForum.dto.LikeForumDto;
import main.sswitch.boards.community.likeForum.service.LikeForumService;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LikeForumMapper {
    public LikeForum LikeForumPostDtoToLikeForum(LikeForumDto likeForumPostDto);

    public LikeForum LikeForumDeleteDtoToLikeForum(LikeForumDto likeForumDto);
    public LikeForumResponseDto LikeToLikeResponseDto(LikeForum likeForum);

    public List<LikeForumResponseDto> LikesToLikesResponseDto(List<LikeForum> likeForums);
}
