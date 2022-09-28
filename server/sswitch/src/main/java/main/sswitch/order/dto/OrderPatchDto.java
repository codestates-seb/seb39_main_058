package main.sswitch.order.dto;

import lombok.Getter;
import main.sswitch.order.entity.Order;

@Getter
public class OrderPatchDto {
    private long orderId;
    private Order.OrderStatus orderStatus;

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }
}
