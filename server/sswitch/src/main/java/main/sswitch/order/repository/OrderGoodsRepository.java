package main.sswitch.order.repository;

import main.sswitch.order.entity.OrderGoods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderGoodsRepository extends JpaRepository<OrderGoods, Long> {
}
