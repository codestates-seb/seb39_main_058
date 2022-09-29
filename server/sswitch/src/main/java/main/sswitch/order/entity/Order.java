package main.sswitch.order.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "LOGIN_ID")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private List<OrderGoods> orderGoods = new ArrayList<>();

    public void setMember(User user) {
        this.user = user;
    }

    public void addOrderGoods(OrderGoods orderGoods) {
        this.orderGoods.add(orderGoods);
        if (orderGoods.getOrder() != this) {
            orderGoods.addOrder(this);
        }
    }

    public enum OrderStatus {
        ORDER_REQUEST(1, "주문 요청"),
        ORDER_CONFIRM(2, "주문 확정"),
        ORDER_COMPLETE(3, "주문 처리 완료"),
        ORDER_CANCEL(4, "주문 취소");

        @Getter
        private int stepNumber;

        @Getter
        private String stepDescription;

        OrderStatus(int stepNumber, String stepDescription) {
            this.stepNumber = stepNumber;
            this.stepDescription = stepDescription;
        }
    }

}
