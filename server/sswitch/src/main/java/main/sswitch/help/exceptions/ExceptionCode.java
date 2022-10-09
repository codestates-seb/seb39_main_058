package main.sswitch.help.exceptions;

import lombok.Getter;

public enum ExceptionCode {
    ACCESS_DENIED(403, "You are not Authorized"),
    TRASHCAN_NOT_FOUND(404, "TrashCan Not Exist"),
    TRASHCAN_EXISTS(409, "TrashCan Exists"),
    TRASHCAN_ALREADY_FULL(409, "TrashCan already full"),
    NOTICE_NOT_FOUND(404, "Notice Not Exist"),
    NOTICE_EXISTS(409, "Notice Exists"),

    EVENT_NOT_FOUND(404, "Event Not Found"),

    EVETN_EXISTS(409, "Event Already Exist"),
    FORUM_NOT_FOUND(404, "Forum Not Exist"),
    LIKE_FORUM_NOT_FOUND(404, "LikeForum Not Exist"),
    LIKE_FORUM_EXIST(409, "LikeForum Exists"),

    FORUM_EXISTS(409, "Forum Exists"),
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    COMMENT_EXIST(404, "Comment Exists"),

    RESULT_NOT_FOUND(404, "Result Not Exist"),

    USER_NOT_FOUND(404, "User Not Found"),

    USER_EXISTS(409, "User Exists"),

    PASSWORD_NOT_FOUND(404, "Wrong Password"),

    EMAIL_EXISTS(409, "Email Exists"),

    EMAIL_NOT_FOUND(404, "Email Not Found"),

    LOGINID_EXISTS(409, "Email Exists"),

    LOGINID_NOT_FOUND(404, "LoginId Not Found"),

    USERNAME_NOT_FOUND(404, "Username Not Found"),
    USERNAME_EXISTS(409, "Username Exists"),

    GOODS_NOT_FOUND(404, "Goods Not Found"),

    GOODS_EXISTS(409, "Goods Exists"),

    ORDER_NOT_FOUND(404, "Order Not Found"),

    ORDER_EXITS(409, "Order Exists"),
    NOT_ENOUGH_POINTS(404, "Points Not Enough");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}
