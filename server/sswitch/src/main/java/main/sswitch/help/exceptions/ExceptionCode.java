package main.sswitch.help.exceptions;

import lombok.Getter;

public enum ExceptionCode {
    ACCESS_DENIED(403, "You are not Authorized"),
    TRASHCAN_NOT_FOUND(404, "TrashCan not exist"),
    TRASHCAN_EXISTS(409, "TrashCan exists"),
    TRASHCAN_ALREADY_FULL(409, "TrashCan already full"),
    NOTICE_NOT_FOUND(404, "Notice not exist"),
    NOTICE_EXISTS(409, "Notice exists"),

    EVENT_NOT_FOUND(404, "Event not found"),

    EVETN_EXISTS(409, "Event already Exist"),
    FORUM_NOT_FOUND(404, "Forum not exist"),
    LIKE_FORUM_NOT_FOUND(404, "LikeForum not exist"),

    FORUM_EXISTS(409, "Forum exists"),
    COMMENT_NOT_FOUND(404, "Comment not found"),

    RESULT_NOT_FOUND(404, "Result not exist"),

    USER_NOT_FOUND(404, "User not found"),

    USER_EXISTS(409, "User exists"),

    PASSWORD_NOT_FOUND(404, "Wrong password"),

    EMAIL_EXISTS(409, "Email exists"),

    EMAIL_NOT_FOUND(404, "Email not found"),

    LOGINID_EXISTS(409, "Email exists"),

    LOGINID_NOT_FOUND(404, "Email not found"),

    USERNAME_NOT_FOUND(404, "Username not found"),
    USERNAME_EXISTS(409, "Username exists"),

    GOODS_NOT_FOUND(404, "Goods not found"),

    GOODS_EXISTS(409, "Goods exists"),

    ORDER_NOT_FOUND(404, "Order not found"),

    ORDER_EXITS(409, "Order exists");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}
