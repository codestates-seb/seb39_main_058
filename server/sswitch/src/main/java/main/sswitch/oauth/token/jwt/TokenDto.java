package main.sswitch.oauth.token.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class TokenDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TokenDetailsDto {
        private String grantType;
        private String accessToken;
        private long accessTokenExpiredAt;
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
