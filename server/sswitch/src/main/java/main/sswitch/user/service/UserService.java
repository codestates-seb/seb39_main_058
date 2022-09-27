package main.sswitch.user.service;

import lombok.AllArgsConstructor;
import lombok.Builder;

import main.sswitch.security.oauth.jwt.TokenProvider;

import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;

import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Transactional
@Service
@Builder
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    public User createUser(User user) {
        verifyExistUser(user.getLoginId());
        verifyExistEmail(user.getEmail());
        verifyExistUserName(user.getUserName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setLoginId(user.getLoginId());
        user.setEmail(user.getEmail());
        user.setUserName(user.getUserName());
        user.setRole("ROLE_USER");
        user.setUserStatus(User.UserStatus.USER_EXIST);
        user.setPoint(0);
        user.setProviders(User.Providers.PROVIDER_SSWITCH);
        User savedUser = userRepository.save(user);

        return savedUser;
    }

    public UserDto.TokenDetailsDto login(User user, HttpServletResponse response) {
        Optional<User> optionalUser = userRepository.findByLoginId(user.getLoginId());
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        if (!passwordEncoder.matches(user.getPassword(), findUser.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_FOUND);
        }
        return tokenProvider.createToken(findUser, response);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public User update(User user) {
        User findUser = findUserWithLoginId(user.getLoginId());
        Optional.ofNullable(user.getUserName()).ifPresent(username -> findUser.setUserName(username));
        Optional.ofNullable(user.getPassword()).ifPresent(password -> findUser.setPassword(password));

        return userRepository.save(findUser);
    }

//    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
//    public User updateProfile(User user) {
//        User findUser = getUser();
//        user.setUserId(findUser.getUserId());
//        Optional.ofNullable(user.getUserName()).ifPresent(username -> findUser.setUserName(username));
//        Optional.ofNullable(user.getPassword()).ifPresent(password -> findUser.setPassword(password));
//        return userRepository.save(findUser);
//    }

    public void delete(long userId) {
        User findUser = findVerifiedUser(userId);
        userRepository.delete(findUser);
    }

//    private void verifyUserRole(long userId) {
//        String role = findUserWithId(userId).getRole();
//        if (role != "ROLE_ADMIN") {
//            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
//        }
//    }

    private void verifyExistUser(String loginId) {
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    private void verifyExistEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }

    private void verifyExistUserName(String userName) {
        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USERNAME_EXISTS);
    }
    private User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }
//
    private User findVerifiedUserWithEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User findEmail = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND));
        return findEmail;
    }
//
    private User findVerifiedUserWithLoginId(String loginId) {
        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        User findLoginId = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LOGINID_NOT_FOUND));
        return findLoginId;
    }

//    private User findVerifiedUserWithUserName(String userName) {
//        Optional<User> optionalUser = userRepository.findByUsername(userName);
//        User findUserName = optionalUser.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.USERNAME_NOT_FOUND));
//        return findUserName;
//    }


//<<<<<<< HEAD
//    public User idCheck(String loginId) {
//        User user = findUserWithLoginId(loginId);
//        return user;
//    }
//=======
//    private User findVerifiedUserRole(String role) {
//        Optional<User> optionalUser = userRepository.findByRole(role);
//        User findRole = optionalUser.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.ACCESS_DENIED));
//        return findRole;
//    }

//    public User getUser(String loginId) {
//        return findUserWithLoginId(loginId);
//    }
//>>>>>>> f45e06a21bed2814f3f8f00d852d215ec47bb450

    @Transactional(readOnly = true)
    public User findUserWithId(long userId) {
        return findVerifiedUser(userId);
    }

    @Transactional(readOnly = true)
    public User findUserWithEmail(String email) {
        return findVerifiedUserWithEmail(email);
    }


    @Transactional(readOnly = true)
    public User findUserWithLoginId(String loginId) {
        return findVerifiedUserWithLoginId(loginId);
    }

    @Transactional(readOnly = true)
    public Page<User> userList(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public boolean checkLoginId(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean checkUsername(String userName) {
        return userRepository.existsByUserName(userName);
    }




}
