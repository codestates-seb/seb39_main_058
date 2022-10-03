package main.sswitch.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import main.sswitch.user.entity.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

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
        private String loginId;
        @NotBlank(message = "비밀번호는 6자리 이상이여야 합니다.")
        private String password;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long userId;

        private String loginId;

        @NotBlank(message = "사용자 이름은 공백이 아니어야 합니다.")
        private String userName;

        @NotBlank(message = "비밀번호는 6자리 이상이여야 합니다.")
        private String password;

        private User.UserStatus userStatus;

        private String role;

        private String email;

        private String profileImage;

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
        private int currentPoints;
        private int totalPoints;
        private String profileImage;
        private LocalDateTime dateCreated;

        private LocalDateTime dateModified;

    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class TokenDetailsDto {
        private String grantType;
        private String accessToken;
        private long accessTokenExpiredAt;
        private LocalDateTime dateCreated;
        private long userId;
        private String userName;
        private String role;

    }
    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class passwordPostDto {
        private String loginId;
        private String email;
        private String password;
    }




}
