package main.sswitch.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.help.audit.BaseEntity;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserClassifiedResponseDto extends BaseEntity {
    private String loginId;
    private String userName;
    private String email;
    private int currentPoints;
    private int totalPoints;
    private LocalDateTime dateCreated;
    private String profileImage;
}
