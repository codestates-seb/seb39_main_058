package main.sswitch.excpetion;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),

    USER_EXISTS(409, "User exists"),

    PASSWORD_NOT_FOUND(404, "Wrong password"),

    EMAIL_EXISTS(409, "Email exists"),

    EMAIL_NOT_FOUND(404, "Email not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
