package main.sswitch.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.user.entity.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostDto {

        private long userId;

        @NotBlank(message = "사용자 아이디는 공백이 아니어야 합니다.")
        private String loginId;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        @NotBlank(message = "사용자 이름은 공백이 아니어야 합니다.")
        private String userName;

        @NotBlank(message = "사용자 이메일 주소는 공백이 아니어야 합니다.")
        @Email
        private String email;

    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long userId;

        @NotBlank(message = "사용자 이름은 공백이 아니어야 합니다.")
        private String userName;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        private User.UserStatus userStatus;
        private User.UserRole role;

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
        private User.UserRole role;
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
