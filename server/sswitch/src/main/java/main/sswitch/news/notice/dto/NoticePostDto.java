package main.sswitch.news.notice.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class NoticePostDto {
    @NotBlank
    private String noticeTitle;

    @NotBlank
    private String noticeText;
}
