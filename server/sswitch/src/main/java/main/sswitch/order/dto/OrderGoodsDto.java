package main.sswitch.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class OrderGoodsDto {
        @Positive
        private long goodsId;

        private String goodsName;

        @Positive
        private int price;

        private List<OrderGoodsDto> orderGoodsList;

        private String goodsText;

        @Positive
        private int currentPoints;

        private String goodsImage;

        private String giftCode;

    @Getter
    @Builder
    @AllArgsConstructor
    @Setter
    public static class Response {
        private Long orderGoodsId;
        private String goodsName;
        private int price;
        private Long goodsId;
        private String goodsText;
        private int currentPoints;
        private String goodsImage;
        private String giftCode;
        private LocalDateTime createdAt;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @Setter
    public static class ResponseList {
        private Long orderGoodsId;
        private String goodsName;
        private int price;
        private Long goodsId;
        private String goodsImage;
        private String giftCode;
        private LocalDateTime createdAt;
    }


}
