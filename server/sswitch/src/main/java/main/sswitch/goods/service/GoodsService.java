package main.sswitch.goods.service;

import main.sswitch.goods.dto.GoodsResponseDto;
import main.sswitch.goods.entity.Goods;
import main.sswitch.goods.repository.GoodsRepository;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoodsService {
    private final GoodsRepository goodsRepository;

    public GoodsService(GoodsRepository goodsRepository) {
        this.goodsRepository = goodsRepository;
    }

    public Goods createGoods(Goods goods) {

        String goodsName = goods.getGoodsName().toUpperCase();
        verifyExistGoodsName(goodsName);
        goods.setGoodsName(goodsName);
        return goodsRepository.save(goods);

    }

    public Goods updateGoods(Goods goods) {

        Goods findGoods = findVerifiedGoods(goods.getGoodsId());

        Optional.ofNullable(goods.getGoodsName())
                .ifPresent(goodsName -> findGoods.setGoodsName(goodsName));
        Optional.ofNullable(goods.getGoodsText())
                .ifPresent(goodsText -> findGoods.setGoodsText(goodsText));
        Optional.ofNullable(goods.getGoodsImage())
                .ifPresent(goodsImage -> findGoods.setGoodsImage(goodsImage));
        Optional.ofNullable(goods.getPrice())
                .ifPresent(price -> findGoods.setPrice(price));
        Optional.ofNullable(goods.getGoodsStatus())
                .ifPresent(goodsStatus -> findGoods.setGoodsStatus(goods.getGoodsStatus()));
        return goodsRepository.save(findGoods);
    }

    public Goods findGoods(long goodsId) {
        return findVerifiedGoods(goodsId);
    }

    public List<Goods> findAllGoods() {
        return goodsRepository.findAll();
    }

    public void deleteGoods(long goodsId) {
        Goods goods = findVerifiedGoods(goodsId);
        goodsRepository.delete(goods);
    }

    public Goods findVerifiedGoods(long goodsId) {
        Optional<Goods> optionalGoods = goodsRepository.findByGoods(goodsId);
        Goods findGoods =
                optionalGoods.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.GOODS_NOT_FOUND));

        return findGoods;
    }

    public Goods findVerifiedGoodsName(String goodsName) {
        Optional<Goods> optionalGoods = goodsRepository.findByGoodsName(goodsName);
        Goods findGoods =
                optionalGoods.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.GOODS_NOT_FOUND));

        return findGoods;
    }

    private void verifyExistGoodsName(String goodsName) {
        Optional<Goods> coffee = goodsRepository.findByGoodsName(goodsName);
        if(coffee.isPresent())
            throw new BusinessLogicException(ExceptionCode.GOODS_EXISTS);
    }
}
