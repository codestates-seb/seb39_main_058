package main.sswitch.security.config;

import lombok.RequiredArgsConstructor;
//<<<<<<< HEAD:server/sswitch/src/main/java/main/sswitch/config/SecurityConfig.java
import main.sswitch.security.oauth.filter.JwtFilter;
import main.sswitch.security.oauth.jwt.JwtAccessDeniedHandler;
import main.sswitch.security.oauth.jwt.JwtAuthenticationEntryPoint;
import main.sswitch.security.oauth.jwt.TokenProvider;
//=======
import main.sswitch.security.oauth.PrincipalDetailService;
//>>>>>>> f45e06a21bed2814f3f8f00d852d215ec47bb450:server/sswitch/src/main/java/main/sswitch/security/config/SecurityConfig.java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig {
    private final CorsFilter corsFilter;
    private final TokenProvider tokenProvider;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final PrincipalDetailService principalDetailService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomDsl())
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET,"/goods/**","/community/forum/take/**", "/community/comment/take/**","/trash/take/**","/news/event/**","/news/notice/**")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/users/**", "/community/forum/take/**", "/community/comment/take/**","/trash/take/**","/orders/**","/users/**", "/orders/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST,"/users/**", "/community/forum/take/**", "/community/comment/take/**","/trash/take/**","/orders/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.DELETE,"/users/**", "/community/forum/take/**", "/community/comment/take/**","/orders/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.PATCH,"/users/**", "/community/forum/take/**", "/community/comment/take/**","/trash/take/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/admin/**","/news/notice/take/**","/news/event/take/**","/goods/**")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.DELETE,"/admin/**","/news/notice/take/**","/news/event/take/**","/goods/**","/trash/take/**","/orders/**")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.PATCH,"/admin/**","/news/notice/take/**","/news/event/take/**","/goods/**")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.GET,"/admin/**")
                .access("hasRole('ROLE_ADMIN')")
                .anyRequest()
                .permitAll();

        http.exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtFilter tokenAuthenticationFilter() {
        return new JwtFilter(tokenProvider);
    }


    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            builder.addFilter(corsFilter)
                    .addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        }
    }
}
