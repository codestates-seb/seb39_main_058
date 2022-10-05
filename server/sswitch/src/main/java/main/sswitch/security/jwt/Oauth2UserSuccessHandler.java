package main.sswitch.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.security.utils.CustomAuthorityUtils;
import main.sswitch.security.jwt.OauthJwtTokenizer;
import main.sswitch.user.dto.UserClassifiedResponseDto;
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
    private final CustomAuthorityUtils authorityUtils;
    private final UserRepository userRepository;

    public Oauth2UserSuccessHandler(OauthJwtTokenizer oauthJwtTokenizer,
                                    CustomAuthorityUtils authorityUtils,
                                    UserService userService,
                                    UserRepository userRepository) {
        this.userRepository = userRepository;
        this.oauthJwtTokenizer = oauthJwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userService = userService;
    }

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException{
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String name = String.valueOf(oAuth2User.getAttributes().get("name"));
        String given_name = String.valueOf(oAuth2User.getAttributes().get("given_name"));
        String provider = String.valueOf(oAuth2User.getAttributes().get("registrationId"));
        List<String> authorities = authorityUtils.createRoles(email);
        Optional<User> optionalUser = userRepository.findByUsername(given_name);
        if(optionalUser.isEmpty()){
            saveUser(email, name, given_name, provider); // oauth2로 등록한 유저의 최소한 정보를 저장하기 위해 저장함
        }

        HelloData data = new HelloData();
        data.setProvider(provider);
        data.setUsername(given_name);
        String result = objectMapper.writeValueAsString(data);
        response.getWriter().write(result);

        response.setHeader("email", email);

        redirect(request, response, email, authorities, given_name);
    }

    private void saveUser(String email,String name,String given_name,String provider) {
        User user = new User();
        if (provider.equals("google")) {
            user.setProviders(User.Providers.PROVIDER_GOOGLE);
        }else {
            user.setProviders(User.Providers.PROVIDER_KAKAO);
        }
        user.setEmail(email);
        user.setUserName(given_name);
        user.setLoginId(provider + given_name);
        user.setPassword(given_name + provider);
        user.setCurrentPoints(10000);
        user.setTotalPoints(10000);
        user.setRole("ROLE_USER");
        userService.createUser(user);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response,
                          String username, List<String> authorities, String name) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);    //현재 작성하는 access토큰과 일치시켜야함
        String refreshToken = delegateRefreshToken(username);

        String uri = createURI(accessToken, refreshToken, name).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
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

    private URI createURI(String accessToken, String refreshToken, String name) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
        queryParams.add("username", name);

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
//                .host("localhost")
//                .port(8080)
                .path("seb39-main-058-tawny.vercel.app/")
//                .queryParams(queryParams)
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
