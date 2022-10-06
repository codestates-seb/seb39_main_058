package main.sswitch.security.oauth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import main.sswitch.security.jwt.OauthJwtTokenizer;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final OauthJwtTokenizer oauthJwtTokenizer;

    public JwtVerificationFilter(OauthJwtTokenizer oauthJwtTokenizer) {
        this.oauthJwtTokenizer = oauthJwtTokenizer;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterchain) throws IOException, ServletException {
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
}
