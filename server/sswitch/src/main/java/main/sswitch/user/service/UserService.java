package main.sswitch.user.service;

import lombok.Builder;
import main.sswitch.excpetion.BusinessLogicException;
import main.sswitch.excpetion.ExceptionCode;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@Builder
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User createUser(@NotNull User user) {
        verifyExistUser(user.getLoginId());
        verifyExistEmail(user.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRole(User.UserRole.ROLE_USER);
        user.setLoginId(user.getLoginId());
        user.setEmail(user.getEmail());
        user.setUserName(user.getUserName());
        user.setProviders(User.Providers.PROVIDER_SSWITCH);
        User savedUser = userRepository.save(user);

        return savedUser;
    }

    public User login(User user) {
        Optional<User> optionalUser = userRepository.findByLoginId(user.getLoginId());
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        if (!findUser.getPassword().equals(bCryptPasswordEncoder.encode(user.getPassword()))) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_FOUND);
        }
        return findUser;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public User update(User user) {
        User findUser = findVerifiedUser(user.getUserId());
        Optional.ofNullable(user.getUserName()).ifPresent(username -> findUser.setUserName(username));
        Optional.ofNullable(user.getPassword()).ifPresent(password -> findUser.setPassword(password));

        return userRepository.save(findUser);
    }

    public void delete(long userId) {
        User findUser = findVerifiedUser(userId);
        userRepository.delete(findUser);
    }

    private User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

    private void verifyExistUser(String loginId) {
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    private User findVerifiedUserWithEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User findEmail = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND));
        return findEmail;
    }

    private void verifyExistEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }

    @Transactional(readOnly = true)
    public User findUserWithId(long userId) {
        return findVerifiedUser(userId);
    }

    @Transactional(readOnly = true)
    public User findUserWithEmail(String email) {
        return findVerifiedUserWithEmail(email);
    }

    @Transactional(readOnly = true)
    public Page<User> userList(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
}