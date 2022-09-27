package main.sswitch.oauth.token.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import main.sswitch.help.audit.BaseEntity;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class TokenDto extends BaseEntity {
    @Data
    @NoArgsConstructor
    @Builder
    public static class TokenDetailsDto {
        private String grantType;
        private String accessToken;
        private long accessTokenExpiredAt;
        private LocalDateTime dateCreated;
        private String userName;
        private String role;

        public TokenDetailsDto(String grantType, String accessToken, long accessTokenExpiredAt, LocalDateTime dateCreated, String userName, String role) {
            this.grantType = grantType;
            this.accessToken = accessToken;
            this.accessTokenExpiredAt = accessTokenExpiredAt;
            this.dateCreated = dateCreated;
            this.userName = userName;
            this.role = role;
        }

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RefreshDto {
        @NotBlank
        private String accessToken;
    }
}
