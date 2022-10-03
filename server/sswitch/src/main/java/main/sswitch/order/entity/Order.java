package main.sswitch.order.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity(name = "ORDERS")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private String userName;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderGoods> orderGoodsList = new ArrayList<>();

    public void changeUser(User user) {
        if(this.user != null){
            this.user.getOrders().remove(this);
        }
        this.user = user;
        if(!user.getOrders().contains(this)){
            user.addOrder(this);
        }
    }
    public void changeUserName(String userName) {
        this.userName = userName;
    }

    public void resetInfo(User user){
        this.userName = user.getUserName();
    }


    public void addOrderGoods(OrderGoods orderGoods) {
        this.orderGoodsList.add(orderGoods);
        if (orderGoods.getOrder() != this) {
            orderGoods.addOrder(this);
        }
    }

}
