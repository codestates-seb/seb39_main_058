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

        private String image;
        private LocalDateTime dateCreated;

        private LocalDateTime dateModified;
        public ResponseDto(User user) {
//            this.userId = userId;
            this.loginId = loginId;
            this.userName = userName;
            this.email = email;
            this.userStatus = userStatus;
//            this.providers = providers;
            this.role = role;
            this.point = point;
            this.dateCreated = dateCreated;
//            this.dateModified = dateModified;
            this.image = image;
        }



//        public static ResponseDto of(User user) {
//            return new ResponseDto(user.getUserId(),user.getLoginId(),user.getPassword(),user.getUserName(),user.getEmail(),
//                    user.getUserStatus(),user.getProviders(),user.getRole(),user.getPoint(),user.getDateCreated(),user.getDateModified(), user.getPhotos());
//        }

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

        public TokenDetailsDto(User user) {
            this.grantType = grantType;
            this.accessToken = accessToken;
            this.accessTokenExpiredAt = accessTokenExpiredAt;
            this.dateCreated = dateCreated;
            this.userId=userId;
            this.userName = userName;
            this.role = role;
        }
    }
    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class passwordPostDto {
        private String loginId;

        private String password;
    }




}
