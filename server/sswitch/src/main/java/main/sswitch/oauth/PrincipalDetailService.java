package main.sswitch.oauth;

import lombok.RequiredArgsConstructor;
import main.sswitch.excpetion.BusinessLogicException;
import main.sswitch.excpetion.ExceptionCode;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        User userEntity = userRepository.findByLoginId(loginId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return PrincipalDetails.create(userEntity);
    }
}
