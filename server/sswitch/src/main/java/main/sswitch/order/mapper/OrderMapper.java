package main.sswitch.order.mapper;

import lombok.RequiredArgsConstructor;
import main.sswitch.order.dto.*;
import main.sswitch.order.entity.Order;
import main.sswitch.order.entity.OrderGoods;
import main.sswitch.user.service.UserService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    public OrderResponseDto orderToOrderResponseDto(Order order){

        OrderResponseDto response = OrderResponseDto.builder()
                .orderId(order.getOrderId())
                .userId(order.getUser().getUserId())
                .userName(order.getUserName())
                .createdAt(order.getDateCreated())
                .modifiedAt(order.getDateModified())
                .orderGoodsList(orderGoodsListToOrderGoodsResponseDto(order.getOrderGoodsList()))
                .build();

        return response;
    }

    public List<OrderGoodsDto.Response> orderGoodsListToOrderGoodsResponseDto(List<OrderGoods> orderGoodsList){
        List<OrderGoodsDto.Response> result = orderGoodsList
                .stream()
                .map(orderGoods -> OrderGoodsDto.Response
                        .builder()
                        .orderGoodsId(orderGoods.getOrderGoodsId())
                        .price(orderGoods.getGoods().getPrice())
                        .currentPoints(orderGoods.getUser().getCurrentPoints())
                        .goodsId(orderGoods.getGoods().getGoodsId())
                        .goodsName(orderGoods.getGoods().getGoodsName())
                        .goodsText(orderGoods.getGoods().getGoodsText())
                        .goodsImage(orderGoods.getGoods().getGoodsImage())
                        .giftCode(orderGoods.getGiftCode())
                        .build())
                .collect(Collectors.toList());

         return result;
    }

    public List<OrderResponseDto> ordersToOrderResponseDto(List<Order> orders){

        List<OrderResponseDto> responses = orders
                .stream()
                .map(order -> OrderResponseDto.builder()
                        .orderId(order.getOrderId())
                        .userId(order.getUser().getUserId())
                        .userName(order.getUserName())
                        .createdAt(order.getDateCreated())
                        .modifiedAt(order.getDateModified())
                        .orderGoodsList(orderGoodsListToOrderGoodsResponseDto(order.getOrderGoodsList()))
                        .build())
                .collect(Collectors.toList());
        return responses;
    }

    public List<OrderGoodsDto.ResponseList> ordersToOrderGoodsResponseDto(List <OrderGoods> orderGoods){

        List<OrderGoodsDto.ResponseList> responses = orderGoods
                .stream()
                .map(orderGoodsList->OrderGoodsDto.ResponseList
                .builder()
                    .orderGoodsId(orderGoodsList.getOrderGoodsId())
                    .goodsId(orderGoodsList.getGoods().getGoodsId())
                    .goodsName(orderGoodsList.getGoods().getGoodsName())
                    .price(orderGoodsList.getGoods().getPrice())
                    .goodsImage(orderGoodsList.getGoods().getGoodsImage())
                    .giftCode(orderGoodsList.getGiftCode())
                    .createdAt(orderGoodsList.getDateCreated())
                .build())
                .collect(Collectors.toList());
        return responses;
    }

}
