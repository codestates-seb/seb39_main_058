package main.sswitch.goods.repository;

import main.sswitch.goods.entity.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
    Optional<Goods> findByGoodsName(String goodsName);

    @Query(value = "SELECT c FROM Goods c WHERE c.goodsId = :goodsId")
    Optional<Goods> findByGoods(long goodsId);
}
