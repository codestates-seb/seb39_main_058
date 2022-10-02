package main.sswitch.goods.dto;

import lombok.Builder;
import lombok.Getter;
import main.sswitch.goods.entity.Goods;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

@Builder
@Getter
public class GoodsResponseDto {
    private long goodsId;
    private String goodsName;
    private String goodsText;
    private int price;
    private String goodsImage;
    private String goodsStatus;
}
