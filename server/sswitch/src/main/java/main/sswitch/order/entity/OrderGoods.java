package main.sswitch.order.entity;

import lombok.*;
import main.sswitch.goods.entity.Goods;
import main.sswitch.help.audit.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderGoods extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderGoodsId;

    @Column(nullable = false)
    private int quantity;

//    @Column(nullable = false)
//    private Long goodsId;

//    @Column(nullable = false)
//    private int price;

//    @Column(nullable = false)
//    private String goodsName;
//
//    @Column(nullable = false)
//    private String goodsText;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "GOODS_ID")
    private Goods goods;

    public void addOrder(Order order) {
        this.order = order;
        if (!this.order.getOrderGoodsList().contains(this)) {
            this.order.getOrderGoodsList().add(this);
        }
    }

    public void addGoods(Goods goods) {
        this.goods = goods;
        if (!this.goods.getOrderGoodsList().contains(this)) {
            this.goods.addOrdergoods(this);
        }
    }
}