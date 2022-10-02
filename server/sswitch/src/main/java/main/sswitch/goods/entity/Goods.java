package main.sswitch.goods.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.order.entity.OrderGoods;
import main.sswitch.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Goods {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long goodsId;
    @Column(length = 100, nullable = false)
    private String goodsName;
    @Column(columnDefinition = "text", nullable = false)
    private String goodsText;
    @Column(length = 7, nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String goodsStatus = GoodsStatus.GOODS_FOR_SALE.getKorStatus();

    private String goodsImage;

    @OneToMany(mappedBy = "goods", cascade = CascadeType.REMOVE)
    private List<OrderGoods> orderGoodsList = new ArrayList<>();

    public void addOrdergoods(OrderGoods orderGoods) {
        this.orderGoodsList.add(orderGoods);
        if (orderGoods.getGoods() != this) {
            orderGoods.addGoods(this);
        }
    }

    public enum GoodsStatus {
        GOODS_FOR_SALE("판매중"),
        GOODS_SOLD_OUT("판매중지");

        @Getter
        private final String korStatus;

        GoodsStatus(String korStatus) {
            this.korStatus = korStatus;
        }
    }

}
