package main.sswitch.boards.community.forum.controller;

import lombok.extern.slf4j.Slf4j;
import main.sswitch.boards.community.forum.dto.ForumPatchDto;
import main.sswitch.boards.community.forum.dto.ForumPostDto;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.forum.mapper.ForumMapper;
import main.sswitch.boards.community.forum.repository.ForumRepository;
import main.sswitch.boards.community.forum.service.ForumService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/community/forum")
@Slf4j
public class ForumController {
    private ForumService forumService;
    private ForumMapper mapper;

    public ForumController(ForumService forumService, ForumMapper mapper) {
        this.forumService = forumService;
        this.mapper = mapper;
    }

    //게시글 등록
    @PostMapping("/take/create")
    public ResponseEntity postForum(@Valid @RequestBody ForumPostDto forumPostDto) {
        Forum forum = forumService.createForum(mapper.ForumPostDtoToForum(forumPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.ForumToForumResponseDto(forum)),
                HttpStatus.CREATED);
    }

    //게시글 수정
    @PatchMapping("/take/{forum_id}")
    public ResponseEntity patchForum(@Positive @PathVariable("forum_id") long forumId,
                                     @Valid @RequestBody ForumPatchDto forumPatchDto) {
        forumPatchDto.setForumId(forumId);
        Forum forum =
                forumService.updateForum(mapper.ForumPatchDtoToForum(forumPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.ForumToForumResponseDto(forum)),
                HttpStatus.OK);
    }

    //게시글 조회
    @GetMapping("/{forum-id}")
    public ResponseEntity getForum(@Positive @PathVariable("forum-id") long forumId,
                                   @RequestParam(value = "SECRET", required = false) long userId) {
//            ,@RequestHeader long userId) {
//        Forum forum = forumService.findForum(forumId, userId);
        Forum forum = forumService.findForum(forumId,userId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.ForumToForumResponseDto(forum)),
                HttpStatus.OK);
    }

    //게시글 목록 조회
    //게시글 목록 조회시 제목 글쓴이만 나타나게 리팩토링 필요
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
    @GetMapping("/search/title")
    public ResponseEntity searchForumtitle(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @PathVariable("/search/title") @RequestParam String title) {
        Page<Forum> pageForums = forumService.findForumTitle(title, page - 1, size);
        List<Forum> forums = pageForums.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.ForumsToForumsResponseDto(forums),pageForums),
                HttpStatus.OK);
    }

    //태그 검색
    @GetMapping("/search/tag")
    public ResponseEntity searchForumTag(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @PathVariable("/search/tag") @RequestParam String tag) {
        Page<Forum> pageForums = forumService.findForumTag(tag, page - 1, size);
        List<Forum> forums = pageForums.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.ForumsToForumsResponseDto(forums),pageForums),
                HttpStatus.OK);
    }

    //작성자 검색
    @GetMapping("/search/username")
    public ResponseEntity searchUsername(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("/search/username") @RequestParam String username) {
        Page<Forum> pageForums = forumService.findUsername(username, page - 1, size);
        List<Forum> forums = pageForums.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.ForumsToForumsResponseDto(forums),pageForums),
                HttpStatus.OK);
    }


    //내용 검색
    @GetMapping("/search/text")
    public ResponseEntity searchForumText(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @PathVariable("/search/text") @RequestParam String text) {
        Page<Forum> pageForums = forumService.findForumText(text, page - 1, size);
        List<Forum> forums = pageForums.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.ForumsToForumsResponseDto(forums),pageForums),
                HttpStatus.OK);
    }

    //게시글 삭제
    @DeleteMapping("/take/{forum-id}")
    public ResponseEntity deleteForum(@PathVariable("forum-id") @Positive long forumId) {
        forumService.deleteForum(forumId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
