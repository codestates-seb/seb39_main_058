package main.sswitch.community.forum.controller;

import main.sswitch.community.forum.dto.ForumPatchDto;
import main.sswitch.community.forum.dto.ForumPostDto;
import main.sswitch.community.forum.dto.ForumSearchDto;
import main.sswitch.community.forum.entity.Forum;
import main.sswitch.community.forum.mapper.ForumMapper;
import main.sswitch.community.forum.service.ForumService;
import main.sswitch.response.dto.MultiResponseDto;
import main.sswitch.response.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/community/forum")
public class ForumController {
    private ForumService forumService;

    private ForumMapper mapper;

    public ForumController(ForumService forumService, ForumMapper mapper) {
        this.forumService = forumService;
        this.mapper = mapper;
    }

    //게시글 등록
    @PostMapping
    public ResponseEntity postForum(@Valid @RequestBody ForumPostDto forumPostDto) {
        Forum forum = forumService.createForum(mapper.ForumPostDtoToForum(forumPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.forumToForumResponseDto(forum)),
                HttpStatus.CREATED);
    }

    //게시글 따봉
    @PatchMapping("/like/{forum-id}")
    public ResponseEntity likeForum(@Positive @PathVariable("like/{forum-id}") long forumId,
                                    @Valid @RequestBody ForumPatchDto forumPatchDto) {
        forumPatchDto.setForumId(forumId);
        Forum forum =
                forumService.likeForum(mapper.ForumPatchDtoToForum(forumPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.forumToForumResponseDto(forum)),
                HttpStatus.OK);
    }

    //게시글 수정
    @PatchMapping("/{forum_id}")
    public ResponseEntity patchForum(@Positive @PathVariable("forum_id") long forumId,
                                     @Valid @RequestBody ForumPatchDto forumPatchDto) {
        forumPatchDto.setForumId(forumId);
        Forum forum =
                forumService.updateForum(mapper.ForumPatchDtoToForum(forumPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.forumToForumResponseDto(forum)),
                HttpStatus.OK);
    }

    //게시글 조회
    @GetMapping("/{forum-id}")
    public ResponseEntity getForum(@Positive @PathVariable("forum-id") long forumId) {
        Forum forum = forumService.findForum(forumId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.forumToForumResponseDto(forum)),
                HttpStatus.OK);
    }

    //게시글 목록 조회
    @GetMapping
    public ResponseEntity getForums(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Forum> pageForums = forumService.findForums(page - 1, size);
        List<Forum> forums = pageForums.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.ForumsToForumsResponseDto(forums), pageForums),
                HttpStatus.OK);
    }

    //게시글 검색
    @GetMapping("/search")
    public ResponseEntity searchForum(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @PathVariable("/search") @RequestParam String keyword) {
        Page<Forum> pageForums = forumService.searchForums(keyword, page - 1, size);
        List<Forum> forums = pageForums.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.ForumsToForumsResponseDto(forums),pageForums),
                HttpStatus.OK);
    }

    //게시글 삭제
    @DeleteMapping("/{forum-id}")
    public ResponseEntity deleteForum(@PathVariable("forum-id") @Positive long forumId) {
        forumService.deleteForum(forumId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
