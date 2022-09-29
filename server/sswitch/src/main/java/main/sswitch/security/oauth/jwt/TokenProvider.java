package main.sswitch.security.oauth.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.sswitch.security.oauth.PrincipalDetails;
import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenProvider{
    private static final String AUTHORITIES_KEY = "auth";
    private final Long ACCESS_TOKEN_EXPIRE_LENGTH = 1000L * 60 * 60;		// 1hour
    private final Long REFRESH_TOKEN_EXPIRE_LENGTH = 1000L * 60 * 60 * 24 * 7;

    @Value(value = "${jwt.secret}")
    private String SECRET_KEY;

    @PostConstruct
    protected void init() {
        this.SECRET_KEY = Base64.getEncoder().encodeToString(SECRET_KEY.getBytes());
    }

    public UserDto.TokenDetailsDto createToken(User user, HttpServletResponse response) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_LENGTH);

        String loginId = user.getLoginId();
        String role = user.getRole();

        String accessToken = Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(loginId)
                .claim(AUTHORITIES_KEY, role)
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();



        return UserDto.TokenDetailsDto.builder()
                .accessToken(accessToken)
                .accessTokenExpiredAt(ACCESS_TOKEN_EXPIRE_LENGTH)
                .grantType("Bearer")
                .userId(user.getUserId())
                .userName(user.getUserName())
                .role(user.getRole())
                .dateCreated(LocalDateTime.now())
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);
        String role = claims.get(AUTHORITIES_KEY).toString();
        PrincipalDetails principal = new PrincipalDetails(claims.getSubject(), role);

        return new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
