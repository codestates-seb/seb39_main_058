package main.sswitch.order.entity;

import lombok.*;
import main.sswitch.goods.entity.Goods;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderGoods extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderGoodsId;

    @Column(nullable = false)
    private int quantity;
    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "ORDER_ID")
    private Order order;
    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "GOODS_ID")
    private Goods goods;

    @ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    @JoinColumn(name = "USER_ID")
    private User user;


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