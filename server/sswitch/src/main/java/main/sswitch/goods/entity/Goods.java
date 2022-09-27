package main.sswitch.goods.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.order.entity.OrderGoods;

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
    private Integer goodsPoint;
    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private GoodsStatus goodsStatus = GoodsStatus.GOODS_FOR_SALE;

    private String goodsImage;

    @OneToMany(mappedBy = "goods")
    private List<OrderGoods> orderGoods = new ArrayList<>();

    public void addOrdergoods(OrderGoods orderGoods) {
        this.orderGoods.add(orderGoods);
        if (orderGoods.getGoods() != this) {
            orderGoods.addGoods(this);
        }
    }

    public enum GoodsStatus {
        GOODS_FOR_SALE("판매중"),
        GOODS_SOLD_OUT("판매중지");

        @Getter
        private String status;

        GoodsStatus(String status) {
            this.status = status;
        }
    }

}
