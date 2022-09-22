package main.sswitch.oauth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import main.sswitch.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.swing.plaf.nimbus.State;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class PrincipalDetails implements UserDetails {
    private User user;
    private Map<String, Object> attributes;

    public PrincipalDetails(String loginId, String role) {
        this.user = User.builder()
                .loginId(loginId)
                .role(role)
                .build();
    }

    public static PrincipalDetails create(User user) {
        return new PrincipalDetails(user.getLoginId(), user.getRole());
    }

    public static PrincipalDetails create(User user, Map<String, Object> attributes) {
        PrincipalDetails principalDetails = PrincipalDetails.create(user);
        principalDetails.setAttributes(attributes);
        return principalDetails;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        this.user.getRoleList().forEach(
                n -> {
                    authorities.add(() -> n);
        });
        return authorities;
    }

    public User getUser() {
        return this.user;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.user.getLoginId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
