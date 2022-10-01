package main.sswitch.user.mapper;
import main.sswitch.user.dto.UserClassifiedResponseDto;
import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User userPostToUser(UserDto.PostDto requestBody);

    User userLoginToUser(UserDto.LoginDto loginDto);

    User userPatchToUser(UserDto.Patch requestBody);

    UserDto.ResponseDto userToAdminResponse(User user);

    UserClassifiedResponseDto userToUserResponseDto(User user);

    List<UserDto.ResponseDto> usersToAdminResponses(List<User> users);

    List<UserClassifiedResponseDto> usersToUserResponses(List<User> users);

    User passwordPostToUser(UserDto.passwordPostDto requestBody);

}
