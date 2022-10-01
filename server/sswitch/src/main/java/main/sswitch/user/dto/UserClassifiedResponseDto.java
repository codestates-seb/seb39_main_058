package main.sswitch.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserClassifiedResponseDto extends BaseEntity {
    private String loginId;
    private String userName;
    private String email;
    private String image;
    private LocalDateTime dateCreated;
}
