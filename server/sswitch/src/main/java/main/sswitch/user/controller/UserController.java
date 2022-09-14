package main.sswitch.user.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.sswitch.dto.MultiResponseDto;
import main.sswitch.dto.SingleResponseDto;
import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.mapper.UserMapper;
import main.sswitch.user.service.UserService;
import net.bytebuddy.TypeCache;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.PostDto requestBody) {
        User user = userMapper.userPostToUser(requestBody);

        User createUser = userService.createUser(user);
        UserDto.ResponseDto response = userMapper.userToUserResponse(createUser);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@Valid @RequestBody UserDto.PostDto requestBody) {
        User user = userMapper.userPostToUser(requestBody);

        User loginUser = userService.login(user);
        UserDto.ResponseDto response = userMapper.userToUserResponse(loginUser);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/users/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {

        return ResponseEntity.ok().body("로그아웃 완료");
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
}
