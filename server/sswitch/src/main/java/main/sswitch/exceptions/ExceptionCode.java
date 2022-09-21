package main.sswitch.exceptions;

import lombok.Getter;

public enum ExceptionCode {
    ACCESS_DENIED(403, "You are not Authorized"),
    TRASHCAN_NOT_FOUND(404, "TrashCan not exist"),
    TRASHCAN_EXISTS(409, "TrashCan exists"),
    TRASHCAN_ALREADY_FULL(409, "TrashCan already full"),
    NOTICE_NOT_FOUND(404, "Notice not exist"),
    NOTICE_EXISTS(409, "Notice exists"),
    FORUM_NOT_FOUND(404, "Forum not exist"),
    FORUM_EXISTS(409, "Forum exists"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    RESULT_NOT_FOUND(404, "Result not exist");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}
