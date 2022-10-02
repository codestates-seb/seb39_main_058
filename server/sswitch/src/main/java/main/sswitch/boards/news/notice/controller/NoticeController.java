package main.sswitch.boards.news.notice.controller;

import lombok.extern.slf4j.Slf4j;
import main.sswitch.boards.news.notice.dto.NoticePatchDto;
import main.sswitch.boards.news.notice.dto.NoticePostDto;
import main.sswitch.boards.news.notice.entity.Notice;
import main.sswitch.boards.news.notice.mapper.NoticeMapper;
import main.sswitch.boards.news.notice.service.NoticeService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/news/notice")
@Slf4j
@CrossOrigin("*")
public class NoticeController {
    private NoticeService noticeService;
    private NoticeMapper mapper;

    public NoticeController(NoticeService noticeService, NoticeMapper mapper) {
        this.noticeService = noticeService;
        this.mapper = mapper;
    }

    @PostMapping("/take/create")
    public ResponseEntity postNotice(@RequestBody NoticePostDto noticePostDto) {
        Notice notice = noticeService.createNotice(mapper.noticePostDtoToNotice(noticePostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.noticeToNoticeResponseDto(notice)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/take/{notice-id}")
    public ResponseEntity patchNotice(@PathVariable("notice-id") @Positive long noticeId,
                                      @Valid @RequestBody NoticePatchDto noticePatchDto) {
        noticePatchDto.setNoticeId(noticeId);

        Notice notice = noticeService.updateNotice(mapper.noticePatchDtoToNotice(noticePatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.noticeToNoticeResponseDto(notice)),
                HttpStatus.OK);
    }

    @GetMapping("/{notice-id}")
    public ResponseEntity getNotice(@Positive @PathVariable("notice-id") long noticeId) {
        Notice notice = noticeService.findNotice(noticeId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.noticeToNoticeResponseDto(notice)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getNotices(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Notice> pageNotices = noticeService.findNotices(page - 1, size);
        List<Notice> notices = pageNotices.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.noticesToNoticesResponseDto(notices),
                        pageNotices),HttpStatus.OK);
    }

    @DeleteMapping("/take/{notice-id}")
    public ResponseEntity deleteNotice(@Positive @PathVariable("notice-id") long noticeId) {
        noticeService.deleteNotice(noticeId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
