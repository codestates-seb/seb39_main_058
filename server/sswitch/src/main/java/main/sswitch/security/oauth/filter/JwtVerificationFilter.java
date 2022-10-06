package main.sswitch.security.oauth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import main.sswitch.security.jwt.OauthJwtTokenizer;
import main.sswitch.security.jwt.TokenProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final OauthJwtTokenizer oauthJwtTokenizer;
    private final TokenProvider tokenProvider;


    public JwtVerificationFilter(OauthJwtTokenizer oauthJwtTokenizer,
                                 TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
        this.oauthJwtTokenizer = oauthJwtTokenizer;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterchain) throws IOException, ServletException {
        String token = parseBearerToken(request);

        if( token != null &&
                StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug(authentication.getName() + "의 인증정보 저장");
        }else {

            try {
                Map<String, Object> claims = verifyJws(request);
                setAuthenticaionToContext(claims);
            } catch (SignatureException signatureException) {
                request.setAttribute("signatureException", signatureException);
            } catch (ExpiredJwtException expiredJwtException) {
                request.setAttribute("expiredJwtException", expiredJwtException);
            } catch (Exception exception) {
                request.setAttribute("exception", exception);
            }
        }
        filterchain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Ahthorization").replace("Bearer", "");
        String base64EncodedSecretKey = oauthJwtTokenizer.encodeBase64SecretKey(oauthJwtTokenizer.getSecretKey());
        Map<String, Object> claims = oauthJwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticaionToContext(Map<String, Object> claims) {
        Authentication authentication = new UsernamePasswordAuthenticationToken( null, "auth");
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


    private String parseBearerToken(HttpServletRequest request) {
        if(request.getHeader("Authorization") != null){
            String bearerToken = request.getHeader("Authorization");


        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
    }
        return null;
    }

}
