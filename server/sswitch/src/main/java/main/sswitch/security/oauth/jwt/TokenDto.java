//package main.sswitch.security.oauth.jwt;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import main.sswitch.help.audit.BaseEntity;
//
//import javax.persistence.FetchType;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToOne;
//import javax.validation.constraints.NotBlank;
//import java.time.LocalDateTime;
//
//public class TokenDto extends BaseEntity {
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @Builder
//    public static class TokenDetailsDto {
//        private String grantType;
//        private String accessToken;
//        private long accessTokenExpiredAt;
//        private LocalDateTime dateCreated;
//        private String userName;
//        private String role;
//
//    }
//
//    @Data
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @Builder
//    public static class RefreshDto {
//        @NotBlank
//        private String accessToken;
//    }
//}
