package main.sswitch.news.notice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import main.sswitch.news.notice.dto.NoticePatchDto;
import main.sswitch.news.notice.dto.NoticePostDto;
import main.sswitch.news.notice.dto.NoticeResponseDto;
import main.sswitch.news.notice.entity.Notice;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-09-20T15:45:52+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class NoticeMapperImpl implements NoticeMapper {

    @Override
    public Notice noticePostDtoToNotice(NoticePostDto noticePostDto) {
        if ( noticePostDto == null ) {
            return null;
        }

        Notice notice = new Notice();

        notice.setNoticeTitle( noticePostDto.getNoticeTitle() );
        notice.setNoticeText( noticePostDto.getNoticeText() );

        return notice;
    }

    @Override
    public Notice noticePatchDtoToNotice(NoticePatchDto noticePatchDto) {
        if ( noticePatchDto == null ) {
            return null;
        }

        Notice notice = new Notice();

        notice.setNoticeId( noticePatchDto.getNoticeId() );
        notice.setNoticeTitle( noticePatchDto.getNoticeTitle() );
        notice.setNoticeText( noticePatchDto.getNoticeText() );

        return notice;
    }

    @Override
    public NoticeResponseDto noticeToNoticeResponseDto(Notice notice) {
        if ( notice == null ) {
            return null;
        }

        NoticeResponseDto.NoticeResponseDtoBuilder noticeResponseDto = NoticeResponseDto.builder();

        noticeResponseDto.noticeId( notice.getNoticeId() );
        noticeResponseDto.noticeTitle( notice.getNoticeTitle() );
        noticeResponseDto.noticeText( notice.getNoticeText() );

        return noticeResponseDto.build();
    }

    @Override
    public List<NoticeResponseDto> noticesToNoticesResponseDto(List<Notice> notices) {
        if ( notices == null ) {
            return null;
        }

        List<NoticeResponseDto> list = new ArrayList<NoticeResponseDto>( notices.size() );
        for ( Notice notice : notices ) {
            list.add( noticeToNoticeResponseDto( notice ) );
        }

        return list;
    }
}
