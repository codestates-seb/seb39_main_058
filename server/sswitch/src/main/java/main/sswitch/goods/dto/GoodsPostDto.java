package main.sswitch.goods.dto;

import lombok.Getter;
import main.sswitch.goods.entity.Goods;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;

@Getter
public class GoodsPostDto {
    @NotBlank( message= "굿즈 이름은 공백이 아니어야 합니다.")
    private String goodsName;
    private String goodsText;
    @Range(min= 100, max= 1000000)
    private int goodsPoint;
    private String goodsImage;
}
