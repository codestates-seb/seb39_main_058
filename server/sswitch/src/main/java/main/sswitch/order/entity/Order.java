package main.sswitch.order.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "ORDERS")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.ORDER_REQUEST;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private String userName;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
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

    public enum OrderStatus {
        ORDER_REQUEST(1, "주문 요청"),
        ORDER_CONFIRM(2, "주문 확정"),
        ORDER_COMPLETE(3, "주문 처리 완료"),
        ORDER_CANCEL(4, "주문 취소");
        private static final Map<String, String> map = Collections.unmodifiableMap(
                Stream.of(values()).collect(Collectors.toMap(OrderStatus::getStepDescription, OrderStatus::name))
        );

        @Getter
        private int stepNumber;

        @Getter
        private String stepDescription;

        OrderStatus(int stepNumber, String stepDescription) {
            this.stepNumber = stepNumber;
            this.stepDescription = stepDescription;
        }
        public static OrderStatus of(String stepDescription){
            return OrderStatus.valueOf(map.get(stepDescription));
        }
    }

    public void updateOrderStatus(OrderStatus orderStatus){
        this.orderStatus = orderStatus;
    }

}
