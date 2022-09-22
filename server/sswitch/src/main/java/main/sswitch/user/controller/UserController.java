package main.sswitch.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.mapper.UserMapper;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import main.sswitch.security.web.SessionConst;
import main.sswitch.security.web.SessionManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final SessionManager sessionManager;

    private final UserRepository userRepository;

    @GetMapping("/")
    public String home(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return "redirect:/";
        }
        String loginId = (String) session.getAttribute(SessionConst.sessionId);
        Optional<User> findUser = userRepository.findByLoginId(loginId);
        User user = findUser.orElseThrow(null);

        if (user == null) {
            return "redirect:/";
        }
        model.addAttribute("user", user);
        return "redirect:/";

    }

    @PostMapping("/signup")
    public String postUser(@Valid @RequestBody UserDto.PostDto requestBody) {
        User user = userMapper.userPostToUser(requestBody);

        User createUser = userService.createUser(user);
        UserDto.ResponseDto response = userMapper.userToUserResponse(createUser);

        return "/";
    }

    @PostMapping("/login")
    public String loginUser(@Valid @RequestBody UserDto.PostDto requestBody, HttpServletResponse res) {
        User user = userMapper.userPostToUser(requestBody);

        User loginUser = userService.login(user);
//        UserDto.ResponseDto response = userMapper.userToUserResponse(loginUser);
        sessionManager.createSession(loginUser.getLoginId(), res);

        return "redirect:/";
    }

    @PostMapping("/users/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return "redirect:/";
        }
        sessionManager.sessionExpired(request);
        return "redirect:/";
    }

    @DeleteMapping("/users/signout/{user_id}")
    public ResponseEntity delete(@PathVariable("user_id") @Positive long userId) {
        userService.delete(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/users/{user_id}")
    public ResponseEntity getUser(@PathVariable("user_id") @Positive long userId) {
        User user = userService.findUserWithId(userId);
        UserDto.ResponseDto responseDto = userMapper.userToUserResponse(user);
        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @PatchMapping("/users/{user_id}")
    public ResponseEntity updateUser(@PathVariable("user_id") @Positive long userId, @Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setUserId(userId);
        User user = userService.update(userMapper.userPatchToUser(requestBody));
        return new ResponseEntity<>(new SingleResponseDto<>(userMapper.userToUserResponse(user)), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity getUsers(@PageableDefault(size = 10, sort = "userName", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<User> users = userService.userList(pageable);
        List<User> userList = users.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(userMapper.usersToUserResponses(userList), users), HttpStatus.OK);
    }

    @GetMapping("/users/findusers/{email}")
    public ResponseEntity findUser(@PathVariable("email") String email) {
        User user = userService.findUserWithEmail(email);
        UserDto.ResponseDto responseDto = userMapper.userToUserResponse(user);
        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @GetMapping("/login-id/{loginId}/verification")
    public ResponseEntity<Boolean> checkLoginId(@PathVariable String loginId) {
        return ResponseEntity.ok(userService.checkLoginId(loginId));
    }

    @GetMapping("/email/{email}/verification")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.checkEmail(email));
    }
    @GetMapping("/username/{userName}/verification")
    public ResponseEntity<Boolean> checkUsername(@PathVariable String userName) {
        return ResponseEntity.ok(userService.checkUsername(userName));
    }
}
