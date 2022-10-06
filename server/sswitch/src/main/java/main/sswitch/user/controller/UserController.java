package main.sswitch.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import main.sswitch.boards.community.comment.entity.Comment;
import main.sswitch.boards.community.comment.service.CommentService;
import main.sswitch.boards.community.forum.entity.Forum;
import main.sswitch.boards.community.forum.service.ForumService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;

import main.sswitch.security.oauth.PrincipalDetails;
import main.sswitch.user.dto.UserClassifiedResponseDto;
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
import java.util.Optional;
import java.util.UUID;

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
        userService.createUser(user);
        return "회원가입 완료";
    }

//    @GetMapping("/users/oauth")
//    public ResponseEntity getProfile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        User user = userService.findUserWithLoginId(principalDetails.getUsername());
//        return new ResponseEntity(new SingleResponseDto<>(userMapper.userLoginToUser(user)),
//                HttpStatus.OK);
//    }

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
        return new ResponseEntity(new SingleResponseDto<>(userMapper.userToAdminResponse(user)),
                HttpStatus.OK);
    }

    @PatchMapping("/users/profile")
    public ResponseEntity patchProfile(@AuthenticationPrincipal PrincipalDetails principalDetails,@Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setLoginId(principalDetails.getUsername());
        User user = userService.updateProfile(requestBody.getLoginId(), userMapper.userPatchToUser(requestBody));
        return new ResponseEntity(new SingleResponseDto<>(userMapper.userToUserResponseDto(user)), HttpStatus.OK);
    }

    @DeleteMapping("/users/signout")
    public ResponseEntity delete(@AuthenticationPrincipal PrincipalDetails principalDetails){
        User user = userService.findUserWithLoginId(principalDetails.getUsername());
        userService.delete(user.getLoginId());

        return new ResponseEntity<>(new SingleResponseDto<>("회원 정보가 모두 삭제되었습니다."), HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/reset")
    public String findPassword(@Valid @RequestBody UserDto.passwordPostDto requestBody) {
        String newPassword = UUID.randomUUID().toString().replaceAll("-", "");
        userService.findUserWithLoginId(requestBody.getLoginId());
        userService.findUserWithEmail(requestBody.getEmail());
        requestBody.setLoginId(requestBody.getLoginId());
        requestBody.setPassword(newPassword);
        userService.resetPassword(userMapper.passwordPostToUser(requestBody));
        return newPassword;
    }

    @GetMapping("/users/{user_name}")
    public ResponseEntity getUser(@PathVariable("user_name") String userName) {
        User user = userService.findUserWithUserName(userName);
        UserClassifiedResponseDto responseDto = userMapper.userToUserResponseDto(user);
        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity getUsers(@PageableDefault(size = 10, sort = "userName", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<User> users = userService.userList(pageable);
        List<User> userList = users.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(userMapper.usersToUserResponses(userList), users), HttpStatus.OK);
    }

    @PatchMapping("/admin/users/{user_id}")
    public ResponseEntity updateUserAsAdmin(@PathVariable("user_id") @Positive long userId, @Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setUserId(userId);
        User user = userService.update(userMapper.userPatchToUser(requestBody));
        return new ResponseEntity<>(new SingleResponseDto<>(userMapper.userToAdminResponse(user)), HttpStatus.OK);
    }

    @GetMapping("/admin/users")
    public ResponseEntity getUsersAsAdmin(@PageableDefault(size = 10, sort = "userId", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<User> users = userService.userList(pageable);
        List<User> userList = users.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(userMapper.usersToAdminResponses(userList), users), HttpStatus.OK);
    }

    @GetMapping("/admin/users/{user_id}")
    public ResponseEntity getUsers(@PathVariable("user_id")@Positive long userId) {
        User user = userService.findUserWithId(userId);
        UserDto.ResponseDto responseDto = userMapper.userToAdminResponse(user);
        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @DeleteMapping("/admin/users/signout/{user_id}")
    public String delete(@PathVariable("user_id")@Positive long userId){
        User user = userService.findUserWithId(userId);
        userService.delete(user.getLoginId());
        return "회원 정보가 모두 삭제되었습니다.";
    }

    @PostMapping("/finduser")
    public ResponseEntity findUser(@Valid @RequestBody UserDto.passwordPostDto requestBody) {
        User user = userService.findUserWithEmail(requestBody.getEmail());
        String loginId = user.getLoginId();
        return new ResponseEntity<>("회원님의 ID는 "+ loginId + " 입니다.", HttpStatus.OK);
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
