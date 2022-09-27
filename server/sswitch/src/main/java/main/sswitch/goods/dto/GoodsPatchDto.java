package main.sswitch.goods.dto;

import lombok.Getter;
import lombok.NonNull;
import main.sswitch.goods.entity.Goods;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Optional;

@Getter
public class GoodsPatchDto {
    private long goodsId;
    @NotBlank( message= "굿즈 이름은 공백이 아니어야 합니다.")
    private String goodsName;
    private String goodsText;
    private Optional<@Range(min= 100, max = 1000000) Integer> goodsPoint = Optional.empty();
    private String goodsImage;
    private Goods.GoodsStatus goodsStatus;

    public void setGoodsId(long goodsId) {
        this.goodsId = goodsId;
    }

    public int getGoodsPoint() {
        return goodsPoint.orElse(0);
    }
}
