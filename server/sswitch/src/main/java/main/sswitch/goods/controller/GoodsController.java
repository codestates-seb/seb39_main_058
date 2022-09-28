package main.sswitch.goods.controller;

import lombok.Builder;
import main.sswitch.goods.dto.GoodsPatchDto;
import main.sswitch.goods.dto.GoodsPostDto;
import main.sswitch.goods.entity.Goods;
import main.sswitch.goods.mapper.GoodsMapper;
import main.sswitch.goods.service.GoodsService;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

//    public GoodsController(GoodsService goodsService, GoodsMapper goodsMapper) {
//        this.goodsService = goodsService;
//        this.mapper = goodsMapper;
//    }

    @PostMapping("/create")
    public String postGoods(@Valid @RequestBody GoodsPostDto goodsPostDto) {
        Goods goods = goodsService.createGoods(mapper.goodsPostDtoToGoods(goodsPostDto));
        return "물품 등록이 완료되었습니다.";
    }

    @PatchMapping("/{goods-id}")
    public ResponseEntity patchGoods(@PathVariable("goods-id") @Positive long goodsId,
                                      @Valid @RequestBody GoodsPatchDto goodsPatchDto) {
        goodsPatchDto.setGoodsId(goodsId);
        Goods goods = goodsService.updateGoods(mapper.goodsPatchDtoToGoods(goodsPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.goodsResponseDtoToGoods(goods)),
                HttpStatus.OK);
    }

    @GetMapping("/{goods-id}")
    public ResponseEntity getCoffee(@PathVariable("goods-id") long goodsId) {
        Goods goods = goodsService.findGoods(goodsId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.goodsResponseDtoToGoods(goods)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCoffees(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Goods> pageGoods = goodsService.findAllGoods(page - 1, size);
        List<Goods> goods = pageGoods.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.goodsToGoodsResponseDtos(goods),
                        pageGoods),
                HttpStatus.OK);
    }

    @DeleteMapping("/{goods-id}")
    public String deleteCoffee(@PathVariable("goods-id") long goodsId) {
        goodsService.deleteGoods(goodsId);

        return "물품이 삭제 되었습니다";
    }
}
