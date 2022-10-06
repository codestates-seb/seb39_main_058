package main.sswitch.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import main.sswitch.user.entity.User;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderPostDto {
    private Long userId;

    private String userName;

    private String goodsName;

    @Valid
    private List<OrderGoodsDto> orderGoodsList;

}
