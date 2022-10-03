package main.sswitch.order.repository;

import main.sswitch.order.entity.OrderGoods;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface OrderGoodsRepository extends JpaRepository<OrderGoods, Long> {
    @Query(value = "SELECT * FROM order_goods WHERE user_id = :userId", nativeQuery = true)
    List<OrderGoods> findAllByUserId(long userId);


}
