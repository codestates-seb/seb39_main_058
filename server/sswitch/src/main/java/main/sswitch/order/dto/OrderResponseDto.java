package main.sswitch.order.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import main.sswitch.order.entity.Order;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderResponseDto {
    private long orderId;

    @Setter(AccessLevel.NONE)
    private String loginId;
    private Order.OrderStatus orderStatus;
    private List<OrderGoodsResponseDto> orderGoods;
    private LocalDateTime createdAt;


    public void setUser(User user) {
        this.loginId = user.getLoginId();
    }
}

