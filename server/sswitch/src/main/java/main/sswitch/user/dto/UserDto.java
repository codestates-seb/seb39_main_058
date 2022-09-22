package main.sswitch.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import main.sswitch.user.entity.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class UserDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostDto {

        private long userId;

        @NotBlank(message = "사용자 아이디는 공백이 아니어야 합니다.")
        private String loginId;

        @NotBlank(message = "비밀번호는 6자리 이상이여야 합니다.")
        private String password;

        @NotBlank(message = "사용자 이름은 공백이 아니어야 합니다.")
        private String userName;

        @NotBlank(message = "사용자 이메일 주소는 공백이 아니어야 합니다.")
        @Email
        private String email;

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LoginDto {
        @NotBlank(message = "사용자 아이디는 공백이 아니어야 합니다.")
        @Pattern(regexp = "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$")
        private String loginId;
        @NotBlank(message = "비밀번호는 0-9사이 숫자, 영어 대문자, 소문자, 특수문자 하나씩을 포함해야 합니다.")
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$")
        private String password;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long userId;

        @NotBlank(message = "사용자 이름은 공백이 아니어야 합니다.")
        @Pattern(regexp = "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$")
        private String userName;

        @NotBlank(message = "비밀번호는 0-9사이 숫자, 영어 대문자, 소문자, 특수문자 하나씩을 포함해야 합니다.")
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$")
        private String password;

        private User.UserStatus userStatus;

        private String role;

        public void setUserId(long userId) {
            this.userId = userId;
        }
    }

    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponseDto {

        private long userId;
        private String loginId;

        private String password;
        private String userName;
        private String email;
        private User.UserStatus userStatus;
        private User.Providers providers;
        private String role;
        private int point;
        public ResponseDto(User user) {
            this.userId = userId;
            this.loginId = loginId;
            this.userName = userName;
            this.email = email;
            this.userStatus = userStatus;
            this.providers = providers;
            this.role = role;
            this.point = point;
        }

    }


}
