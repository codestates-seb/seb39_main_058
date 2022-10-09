package main.sswitch.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.oauth2.sdk.util.MapUtils;
import lombok.extern.slf4j.Slf4j;
import main.sswitch.security.jwt.OauthJwtTokenizer;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@Slf4j
@Service
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
//        System.out.println(oAuth2User);
        String lastname = "lastname";
        String email = "email";
        String name = "name";
        String image = "";
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
//        System.out.println("kakaoAccount" + kakaoAccount);
        if(MapUtils.isEmpty(kakaoAccount)) {
             lastname = String.valueOf(oAuth2User.getAttributes().get("given_name"));
             email = String.valueOf(oAuth2User.getAttributes().get("email"));
            image = String.valueOf(oAuth2User.getAttributes().get("profile_image"));
        }else{
            Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
            lastname = String.valueOf(properties.get("nickname"));
            image = String.valueOf(properties.get("profile_image"));
             email = lastname + "@kakao.com";
        }
        String authorities = "ROLE_USER";
        Optional<User> optionalUser = userRepository.findByUsername(lastname);
        if(optionalUser.isEmpty()){
            saveUser(email, lastname, provider, image); // oauth2로 등록한 유저의 최소한 정보를 저장하기 위해 저장함
        }

        redirect(request, response, lastname, authorities);
    }

    private void saveUser(String email,String lastname,String provider,String image) {
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
        user.setProfileImage(image);
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
                .path("/oauthloading")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
