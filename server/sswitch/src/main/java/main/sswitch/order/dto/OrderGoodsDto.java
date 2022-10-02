package main.sswitch.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class OrderGoodsDto {
        @Positive
        private long goodsId;

        private String goodsName;
        @Positive
        private int quantity;

        private int price;

        private List<OrderGoodsDto> orderGoodsList;

        private String goodsText;

        private int currentPoints;

        private long pointsId;

    @Getter
    @Builder
    @AllArgsConstructor
    @Setter
    public static class Response {
        private Long orderGoodsId;
        private int quantity;
        private String goodsName;
        private int price;
        private int totalPrice;
        private Long goodsId;
        private String goodsText;
        private int currentPoints;
        private long pointsId;
//        private String goodsImage;
    }


}
