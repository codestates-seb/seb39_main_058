package main.sswitch.security.config;

import lombok.extern.slf4j.Slf4j;
import main.sswitch.security.jwt.JwtAccessDeniedHandler;
import main.sswitch.security.jwt.JwtAuthenticationEntryPoint;
import main.sswitch.security.jwt.TokenProvider;
import main.sswitch.security.oauth.filter.JwtVerificationFilter;
import main.sswitch.security.jwt.OauthJwtTokenizer;
import main.sswitch.security.handler.Oauth2UserSuccessHandler;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig {
    private final OauthJwtTokenizer oauthJwtTokenizer;
    private final UserService userService;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    private final CorsFilter corsFilter;

    public SecurityConfig(OauthJwtTokenizer oauthJwtTokenizer,
                          UserService userService,
                          UserRepository userRepository,
                          TokenProvider tokenProvider,
                          CorsFilter corsFilter) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.userService = userService;
        this.oauthJwtTokenizer = oauthJwtTokenizer;

    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//        authenticationManagerBuilder.userDetailsService(principalDetailService).passwordEncoder(passwordEncoder());
//        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

        http.headers().frameOptions().disable().and()
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                .accessDeniedHandler(new JwtAccessDeniedHandler())
                .and()
                .apply(new CustomDsl())
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET,"/goods/**","/community/forum/take/**", "/community/comment/take/**","/news/event/**","/news/notice/**")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/users/**","/trash/take/**","/orders/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST,"/users/**", "/community/forum/take/**", "/community/comment/take/**","/trash/flush/**","/orders/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.DELETE,"/users/**", "/community/forum/take/**", "/community/comment/take/**","/orders/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.PATCH,"/users/**", "/community/forum/take/**", "/community/comment/take/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/admin/**","/news/notice/take/**","/news/event/take/**","/goods/**","/trash/take/**")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.DELETE,"/admin/**","/news/notice/take/**","/news/event/take/**","/goods/**","/trash/**")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.PATCH,"/admin/**","/news/notice/take/**","/news/event/take/**","/goods/**","/trash/take/**")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.GET,"/admin/**")
                .access("hasRole('ROLE_ADMIN')")
                .anyRequest()
                .permitAll()
                .and()
                .oauth2Login(
                        oauth2 -> oauth2
                    .successHandler(new Oauth2UserSuccessHandler(oauthJwtTokenizer, userService, userRepository)));

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOriginPatterns(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", configuration);
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;

    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(oauthJwtTokenizer,tokenProvider);

            builder.addFilter(corsFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
