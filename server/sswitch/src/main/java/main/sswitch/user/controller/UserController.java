package main.sswitch.user.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.mapper.UserMapper;
import main.sswitch.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/")
@Validated
@Slf4j
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/signup")
    public ResponseEntity signupUser(@Valid @RequestBody UserDto.Post post) {
        User user = userMapper.userPostToUser(post);
        userService.signUp(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
