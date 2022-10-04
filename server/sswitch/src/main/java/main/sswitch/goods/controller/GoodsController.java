package main.sswitch.goods.controller;

import lombok.Builder;
import main.sswitch.goods.dto.GoodsPatchDto;
import main.sswitch.goods.dto.GoodsPostDto;
import main.sswitch.goods.dto.GoodsResponseDto;
import main.sswitch.goods.entity.Goods;
import main.sswitch.goods.mapper.GoodsMapper;
import main.sswitch.goods.service.GoodsService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/goods")
@Validated
@Builder
public class GoodsController {
    private GoodsService goodsService;
    private GoodsMapper mapper;


    @PostMapping("/admin/create")
    public ResponseEntity postGoods(@Valid @RequestBody GoodsPostDto goodsPostDto) {
        Goods goods = goodsService.createGoods(mapper.goodsPostDtoToGoods(goodsPostDto));
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.goodsResponseDtoToGoods(goods)), HttpStatus.CREATED);
    }

    @PatchMapping("/admin/{goods-id}")
    public ResponseEntity patchGoods(@PathVariable("goods-id") long goodsId,
                                      @Valid @RequestBody GoodsPatchDto goodsPatchDto) {
        goodsPatchDto.setGoodsId(goodsId);
        Goods goods = goodsService.updateGoods(mapper.goodsPatchDtoToGoods(goodsPatchDto));
        if(goodsPatchDto.getGoodsStatus().equals("판매중")){

        }

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.goodsResponseDtoToGoods(goods)),
                HttpStatus.OK);
    }

    @GetMapping("/{goods-id}")
    public ResponseEntity getGoods(@PathVariable("goods-id") long goodsId) {
        Goods goods = goodsService.findVerifiedGoods(goodsId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.goodsResponseDtoToGoods(goods)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllGoods() {
        List<Goods> goodsList = goodsService.findAllGoods();
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.goodsToGoodsResponseDtos(goodsList)),
                HttpStatus.OK);
    }




    @DeleteMapping("/admin/{goods-id}")
    public String deleteGoods(@PathVariable("goods-id") long goodsId) {
        goodsService.deleteGoods(goodsId);

        return "물품이 삭제 되었습니다";
    }
}
