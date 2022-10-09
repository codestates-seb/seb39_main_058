package main.sswitch.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.security.jwt.OauthJwtTokenizer;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

public class Oauth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final OauthJwtTokenizer oauthJwtTokenizer;
    private final UserService userService;

    private final UserRepository userRepository;

    public Oauth2UserSuccessHandler(OauthJwtTokenizer oauthJwtTokenizer,
                                    UserService userService,
                                    UserRepository userRepository) {
        this.userRepository = userRepository;
        this.oauthJwtTokenizer = oauthJwtTokenizer;
        this.userService = userService;
    }

    private ObjectMapper objectMapper = new ObjectMapper();

    //카카오 메일 못받을때 처리 생각해야함
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException{
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String lastname = String.valueOf(oAuth2User.getAttributes().get("given_name"));
        String provider = String.valueOf(oAuth2User.getAttributes().get("registrationId"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
//        Optional<String> email = Optional.ofNullable(String.valueOf(oAuth2User.getAttributes().get("email")));
//        if (email.isPresent()) {
//            email = Optional.of(given_name + "@" + provider + ".com");
//        }
        String name = String.valueOf(oAuth2User.getAttributes().get("name"));
        String authorities = "ROLE_USER";
        Optional<User> optionalUser = userRepository.findByUsername(lastname);
        if(optionalUser.isEmpty()){
            saveUser(email, name, lastname, provider); // oauth2로 등록한 유저의 최소한 정보를 저장하기 위해 저장함
        }



//        Cookie cookie = new Cookie("provider", provider);
//        response.addCookie(cookie);
//        String accessToken = delegateAccessToken(lastname);    //현재 작성하는 access토큰과 일치시켜야함
//
        redirect(request, response, lastname, authorities);
    }

    private void saveUser(String email,String name,String lastname,String provider) {
        User user = new User();
        if (provider.equals("google")) {
            user.setProviders(User.Providers.PROVIDER_GOOGLE);
        }else {
            user.setProviders(User.Providers.PROVIDER_KAKAO);
        }
        user.setEmail(email);
        user.setUserName(lastname);
        user.setLoginId(lastname);
        user.setPassword(lastname + provider);
        user.setCurrentPoints(10000);
        user.setTotalPoints(10000);
        user.setRole("ROLE_USER");
        userService.createUser(user);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response,
                          String lastname, String authorities) throws IOException {
        String accessToken = delegateAccessToken(lastname, authorities);    //현재 작성하는 access토큰과 일치시켜야함
        String refreshToken = delegateRefreshToken(lastname + authorities);

        String uri = createURI(accessToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String lastname, String authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("auth",authorities);

        String subject = lastname;
        Date expiration = oauthJwtTokenizer.getTokenExpiration(oauthJwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = oauthJwtTokenizer.encodeBase64SecretKey(oauthJwtTokenizer.getSecretKey());

        String accessToken = oauthJwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = oauthJwtTokenizer.getTokenExpiration(oauthJwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = oauthJwtTokenizer.encodeBase64SecretKey(oauthJwtTokenizer.getSecretKey());

        String refreshToken = oauthJwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI( String accessToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);

//        queryParams.add("refresh_token", refreshToken);
//        queryParams.add("username", name);

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("seb39-main-058-tawny.vercel.app")
//                .port(8080)
                .path("/login")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    @Getter
    @Setter
    private class HelloData {
        private String username;
        private String provider;
    }
}
