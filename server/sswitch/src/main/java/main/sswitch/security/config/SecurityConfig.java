package main.sswitch.security.config;

import lombok.RequiredArgsConstructor;
import main.sswitch.security.jwt.JwtAccessDeniedHandler;
import main.sswitch.security.jwt.JwtAuthenticationEntryPoint;
import main.sswitch.security.utils.CustomAuthorityUtils;
//import main.sswitch.security.oauth.filter.JwtFilter;
import main.sswitch.security.oauth.filter.JwtVerificationFilter;
//import main.sswitch.security.handler.JwtAccessDeniedHandler;
//import main.sswitch.security.handler.JwtAuthenticationEntryPoint;
import main.sswitch.security.jwt.OauthJwtTokenizer;
import main.sswitch.security.handler.Oauth2UserSuccessHandler;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig {
    private final OauthJwtTokenizer oauthJwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;
    private final UserRepository userRepository;

    private final CorsFilter corsFilter;

    public SecurityConfig(OauthJwtTokenizer oauthJwtTokenizer,
                          CustomAuthorityUtils authorityUtils,
                          UserService userService,
                          UserRepository userRepository,
                          CorsFilter corsFilter) {
        this.userRepository = userRepository;
        this.corsFilter = corsFilter;
        this.userService = userService;
        this.oauthJwtTokenizer = oauthJwtTokenizer;
        this.authorityUtils = authorityUtils;

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
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/admin/**", "/news/notice/take/**", "/news/event/take/**", "/orders/delete/**", "/trash/admin/**")
                        .hasRole("ROLE_ADMIN")
                        .antMatchers("/users/**", "/community/forum/take/**", "/community/comment/take/**", "/trash/take/**")
                        .hasRole("ROLE_USER")
                        .anyRequest()
                        .permitAll())
                .oauth2Login(
                        oauth2 -> oauth2
//                .authorizationEndpoint()
//                .baseUri("/oauth2/authorization")
//                .and()
//                .redirectionEndpoint()
//                .baseUri("/oauth2/callback/*")
//                .and()
                                .successHandler(new Oauth2UserSuccessHandler(oauthJwtTokenizer, authorityUtils, userService, userRepository)));

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
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(oauthJwtTokenizer, authorityUtils);

            builder.addFilter(corsFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
