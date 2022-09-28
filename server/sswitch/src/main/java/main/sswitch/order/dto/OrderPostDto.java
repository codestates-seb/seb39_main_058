package main.sswitch.order.dto;

import lombok.Getter;
import main.sswitch.user.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class OrderPostDto {
    @Positive
    private long userId;

    @Valid
    private List<OrderGoodsDto> orderGoodsList;

    public User getUser() {
        User user = new User();
        user.setUserId(userId);
        return user;
    }
}
