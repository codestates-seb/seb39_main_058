package main.sswitch.order.dto;

import lombok.*;
import main.sswitch.order.entity.Order;
import main.sswitch.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@Setter
public class OrderResponseDto {
    private Long orderId;

    private long userId;

    private String userName;

    private String totalPrice;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private List<OrderGoodsDto.Response> orderGoodsList;

}

