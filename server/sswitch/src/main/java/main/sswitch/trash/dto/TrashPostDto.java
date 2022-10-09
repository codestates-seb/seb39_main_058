package main.sswitch.trash.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.trash.entity.TrashCan;
import main.sswitch.user.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
public class TrashPostDto {

    @Pattern(regexp = "^[0-9.]*$",message = "경도는 숫자와 . 만 입력할 수 있습니다.")
    @NotBlank
    private String longitude;

    @Pattern(regexp = "^[0-9.]*$",message = "위도는 숫자와 . 만 입력할 수 있습니다.")
    @NotBlank
    private String latitude;

    @NotNull
    private long userId;

    private TrashCan.TrashStatus trashStatus;

    @NotBlank
    private String address;


}