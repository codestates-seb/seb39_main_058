package main.sswitch.boards.news.notice.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class NoticePatchDto {
    private long noticeId;

    @NotBlank
    private String noticeTitle;

    @NotBlank
    private String noticeText;

    private long userId;

    public void setNoticeId(long noticeId) {
        this.noticeId = noticeId;
    }


}
