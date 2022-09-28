package main.sswitch.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;

import main.sswitch.security.oauth.PrincipalDetails;
import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.mapper.UserMapper;

import main.sswitch.user.service.UserService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/")
    public String home() {
        return "Main Page";
    }

    @PostMapping("/signup")
    public String postUser(@Valid @RequestBody UserDto.PostDto requestBody) {
        User user = userMapper.userPostToUser(requestBody);

        User createUser = userService.createUser(user);
        UserDto.ResponseDto response = userMapper.userToUserResponse(createUser);

        return "회원가입 완료";
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@Valid @RequestBody UserDto.LoginDto loginDto, HttpServletResponse res) {
        UserDto.TokenDetailsDto tokenDetailsDto = userService.login(userMapper.userLoginToUser(loginDto), res);
        return new ResponseEntity(new SingleResponseDto<>(tokenDetailsDto), HttpStatus.OK);
    }

    @PostMapping("/users/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        return "로그아웃";
    }

    @GetMapping("/users/profile")
    public ResponseEntity getProfile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        User user = userService.findUserWithLoginId(principalDetails.getUsername());
        return new ResponseEntity(new SingleResponseDto<>(userMapper.userToUserResponse(user)),
                HttpStatus.OK);
    }

    @PatchMapping("/users/profile")
    public ResponseEntity patchProfile(@AuthenticationPrincipal PrincipalDetails principalDetails,@Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setLoginId(principalDetails.getUsername());
        User user = userService.updateProfile(requestBody.getLoginId(), userMapper.userPatchToUser(requestBody));
        return new ResponseEntity(new SingleResponseDto<>(userMapper.userToUserResponse(user)), HttpStatus.OK);
    }

    @DeleteMapping("/users/signout")
    public ResponseEntity delete(@AuthenticationPrincipal PrincipalDetails principalDetails){
        User user = userService.findUserWithLoginId(principalDetails.getUsername());
        userService.delete(user.getLoginId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/users/{user_name}")
    public ResponseEntity getUser(@PathVariable("user_name")String userName) {
        User user = userService.findUserWithUserName(userName);
        UserDto.ResponseDto responseDto = userMapper.userToUserResponse(user);
        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @PatchMapping("/admin/users/{user_id}")
    public ResponseEntity updateUser(@PathVariable("user_id") @Positive long userId, @Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setUserId(userId);
        User user = userService.update(userMapper.userPatchToUser(requestBody));
        return new ResponseEntity<>(new SingleResponseDto<>(userMapper.userToUserResponse(user)), HttpStatus.OK);
    }

    @GetMapping("/admin/users")
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
