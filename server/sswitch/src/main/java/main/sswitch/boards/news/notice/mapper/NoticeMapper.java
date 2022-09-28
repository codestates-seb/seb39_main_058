package main.sswitch.boards.news.notice.mapper;

import main.sswitch.boards.news.notice.dto.NoticePatchDto;
import main.sswitch.boards.news.notice.dto.NoticePostDto;
import main.sswitch.boards.news.notice.dto.NoticeResponseDto;
import main.sswitch.boards.news.notice.entity.Notice;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface NoticeMapper {

    Notice noticePostDtoToNotice(NoticePostDto noticePostDto);

    Notice noticePatchDtoToNotice(NoticePatchDto noticePatchDto);

    NoticeResponseDto noticeToNoticeResponseDto(Notice notice);

//    List<NoticeResponseDto> noticesToNoticesResponseDto(List<Notice> notices);

    default List<NoticeResponseDto> noticesToNoticesResponseDto(List<Notice> notices) {
        return notices
                .stream()
                .map(notice -> NoticeResponseDto
                        .builder()
                        .noticeId(notice.getNoticeId())
                        .loginId(notice.getUser().getLoginId())
                        .noticeTitle(notice.getNoticeTitle())
                        .noticeText(notice.getNoticeText())
                        .userName(notice.getUser().getUserName())
                        .dateCreated(notice.getDateCreated())
                        .dateModified(notice.getDateModified())
                        .build())
                .collect(Collectors.toList());
    }

}

