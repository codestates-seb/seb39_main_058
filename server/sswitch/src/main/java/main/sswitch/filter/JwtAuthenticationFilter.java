package main.sswitch.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import main.sswitch.excpetion.BusinessLogicException;
import main.sswitch.excpetion.ExceptionCode;
import main.sswitch.oauth.PrincipalDetails;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            ObjectMapper om = new ObjectMapper();
            User user = om.readValue(request.getInputStream(), User.class);
            Optional<User> optionalUser = userRepository.findByLoginId(user.getLoginId());
            User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
            if (!bCryptPasswordEncoder.matches(user.getPassword(), findUser.getPassword())) {
                throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_FOUND);
            }
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getLoginId(),user.getPassword());
            System.out.println(authenticationToken);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("Authentication Successful");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        Long userId = principalDetails.getUser().getUserId();
        String loginId = principalDetails.getUser().getLoginId();
        String userName = principalDetails.getUser().getUserName();

        String jwtToken = JWT.create()
                .withSubject("cos jwt token")
                .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 10)))
                .withClaim("loginId", principalDetails.getUser().getLoginId())
                .sign(Algorithm.HMAC512("${jwt.secret}"));
        response.addHeader("Authorization", "Bearer " + jwtToken);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String json =
                "{\"userId\":" + userId + ",\n\"loginId\":\"" + loginId + "\",\n\"userName\":\"" + userName + "\", \n\"jwtToken\":\"" + jwtToken + "\"}";
        response.getWriter().write(json);
    }
}
