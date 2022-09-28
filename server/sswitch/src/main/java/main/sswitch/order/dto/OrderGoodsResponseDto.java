package main.sswitch.order.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OrderGoodsResponseDto {
    private long goodsId;
    private Integer quantity;
    private String goodsName;
    private Integer goodsPoint;
    private String goodsText;
}
