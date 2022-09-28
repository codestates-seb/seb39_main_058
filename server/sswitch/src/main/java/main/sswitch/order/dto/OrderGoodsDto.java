package main.sswitch.order.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class OrderGoodsDto {
    @Positive
    private long goodsId;

    private String goodsName;

    @Positive
    private int quantity;
}
