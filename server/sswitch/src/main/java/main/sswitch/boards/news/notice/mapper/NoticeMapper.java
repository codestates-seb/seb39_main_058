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

    List<NoticeResponseDto> noticesToNoticesResponseDto(List<Notice> notices);

    default NoticeResponseDto noticeToNoticeResponseDto(Notice notice) {
        NoticeResponseDto noticeResponseDto = new NoticeResponseDto();

        noticeResponseDto.setUserName(notice.getUser().getUserName());
        noticeResponseDto.setUserId(notice.getUser().getUserId());
        noticeResponseDto.setNoticeId(notice.getNoticeId());
        noticeResponseDto.setNoticeTitle(notice.getNoticeTitle());
        noticeResponseDto.setNoticeText(notice.getNoticeText());
        noticeResponseDto.setDateCreated(notice.getDateCreated());

        return noticeResponseDto;
    }

//    List<NoticeResponseDto> noticesToNoticesResponseDto(List<Notice> notices);

//    default List<NoticeResponseDto> noticesToNoticesResponseDto(List<Notice> notices) {
//        return notices
//                .stream()
//                .map(notice -> NoticeResponseDto
//                        .builder()
//                        .noticeId(notice.getNoticeId())
//                        .noticeTitle(notice.getNoticeTitle())
//                        .noticeText(notice.getNoticeText())
//                        .userId(notice.getUser().getUserId())
//                        .userName(notice.getUser().getUserName())
//                        .dateCreated(notice.getDateCreated())
//                        .dateModified(notice.getDateModified())
//                        .build())
//                .collect(Collectors.toList());
//    }
}

