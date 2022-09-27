package main.sswitch.goods.mapper;

import main.sswitch.goods.dto.GoodsPatchDto;
import main.sswitch.goods.dto.GoodsPostDto;
import main.sswitch.goods.dto.GoodsResponseDto;
import main.sswitch.goods.entity.Goods;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GoodsMapper {
    Goods goodsPostDtoToGoods(GoodsPostDto goodsPostDto);

    Goods goodsPatchDtoToGoods(GoodsPatchDto goodsPatchDto);

    Goods goodsResponseDtoToGoods(Goods goods);

    List<GoodsResponseDto> goodsToGoodsResponseDtos(List<Goods> goods);
}
