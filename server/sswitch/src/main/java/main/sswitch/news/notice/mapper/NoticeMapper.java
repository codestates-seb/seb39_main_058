package main.sswitch.news.notice.mapper;

import main.sswitch.news.notice.dto.NoticePatchDto;
import main.sswitch.news.notice.dto.NoticePostDto;
import main.sswitch.news.notice.dto.NoticeResponseDto;
import main.sswitch.news.notice.entity.Notice;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoticeMapper {

    Notice noticePostDtoToNotice(NoticePostDto noticePostDto);

    Notice noticePatchDtoToNotice(NoticePatchDto noticePatchDto);

    NoticeResponseDto noticeToNoticeResponseDto(Notice notice);

    List<NoticeResponseDto> noticesToNoticesResponseDto(List<Notice> notices);
}
