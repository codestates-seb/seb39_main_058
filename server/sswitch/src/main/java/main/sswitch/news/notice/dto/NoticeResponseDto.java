package main.sswitch.news.notice.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NoticeResponseDto {
    private long noticeId;
    private String noticeTitle;
    private String noticeText;

}
