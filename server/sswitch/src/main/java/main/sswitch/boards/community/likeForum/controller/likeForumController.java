package main.sswitch.boards.community.likeForum.controller;

import lombok.extern.slf4j.Slf4j;
import main.sswitch.boards.community.likeForum.entity.LikeForum;
import main.sswitch.boards.community.likeForum.dto.LikeForumDto;
import main.sswitch.boards.community.likeForum.mapper.LikeForumMapper;
import main.sswitch.boards.community.likeForum.service.LikeForumService;
import main.sswitch.help.response.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@Validated
@RestController
@RequestMapping("/community/forum")
public class likeForumController {
    private LikeForumService likeForumService;
    private LikeForumMapper mapper;

    public likeForumController(LikeForumService likeForumService,
                               LikeForumMapper mapper) {
        this.likeForumService = likeForumService;
        this.mapper = mapper;
    }


    @PostMapping("/take/like")
    public ResponseEntity createLikeForum(@Valid @RequestBody LikeForumDto likeForumPostDto) {
        LikeForum likeForum = likeForumService.createLike(mapper.LikeForumPostDtoToLikeForum(likeForumPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.LikeToLikeResponseDto(likeForum)),
                HttpStatus.CREATED);
    }

//    @GetMapping
//    public ResponseEntity getLikeForums(@Positive @PathVariable() long likeforumId) {
//        Page<LikeForum> pageLikes = likeForumService.findLikes(page - 1, 10);
//        List<LikeForum> likes = pageLikes.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.LikesToLikesResponseDto(likes), pageLikes),
//                HttpStatus.OK
//        );
//    }

    @DeleteMapping("/take/like/")
    public ResponseEntity deleteLikeForum(@Valid @RequestBody LikeForumDto likeForumDto) {
        likeForumService.deleteLike(mapper.LikeForumDeleteDtoToLikeForum(likeForumDto));
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
