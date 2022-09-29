package main.sswitch.order.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.goods.entity.Goods;
import main.sswitch.help.audit.BaseEntity;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrderGoods extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderGoodsId;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "GOODS_ID")
    private Goods goods;

    public void addOrder(Order order) {
        this.order = order;
        if (!this.order.getOrderGoods().contains(this)) {
            this.order.getOrderGoods().add(this);
        }
    }

    public void addGoods(Goods goods) {
        this.goods = goods;
        if (!this.goods.getOrderGoods().contains(this)) {
            this.goods.addOrdergoods(this);
        }
    }
}