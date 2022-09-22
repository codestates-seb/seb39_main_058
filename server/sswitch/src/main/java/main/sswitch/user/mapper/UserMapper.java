package main.sswitch.user.mapper;
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

    UserDto.ResponseDto userToUserResponse(User user);

    List<UserDto.ResponseDto> usersToUserResponses(List<User> users);

}
