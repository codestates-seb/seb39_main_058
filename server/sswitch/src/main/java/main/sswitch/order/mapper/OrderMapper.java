package main.sswitch.order.mapper;

import lombok.RequiredArgsConstructor;
import main.sswitch.goods.entity.Goods;
import main.sswitch.order.dto.*;
import main.sswitch.order.entity.Order;
import main.sswitch.order.entity.OrderGoods;
import main.sswitch.user.dto.UserDto;
import main.sswitch.user.entity.User;
import main.sswitch.user.service.UserService;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final UserService userService;
    public OrderResponseDto orderToOrderResponseDto(Order order){
        int orderPrice = 0;

        OrderResponseDto response = OrderResponseDto.builder()
                .orderId(order.getOrderId())
                .userId(order.getUser().getUserId())
                .userName(order.getUserName())
                .orderStatus(order.getOrderStatus().getStepDescription())
                .createdAt(order.getDateCreated())
                .modifiedAt(order.getDateModified())
                .orderGoodsList(orderGoodsListToOrderGoodsResponseDto(order.getOrderGoodsList()))
                .build();
        orderPrice = response.getOrderGoodsList().stream().map(
                orderGoods -> orderGoods.getTotalPrice()).mapToInt(p -> p).sum();
        response.setPrice(orderPrice);

        int currentPoints = order.getUser().getCurrentPoints();
        userService.updatePoints(order.getUser(), currentPoints, orderPrice);

        return response;
    }

    public List<OrderGoodsDto.Response> orderGoodsListToOrderGoodsResponseDto(List<OrderGoods> orderGoodsList){
        List<OrderGoodsDto.Response> result = orderGoodsList
                .stream()
                .map(orderGoods -> OrderGoodsDto.Response
                        .builder()
                        .orderGoodsId(orderGoods.getOrderGoodsId())
                        .quantity(orderGoods.getQuantity())
                        .price(orderGoods.getGoods().getPrice())
                        .totalPrice(orderGoods.getQuantity() * orderGoods.getGoods().getPrice())
                        .currentPoints(orderGoods.getUser().getCurrentPoints() - (orderGoods.getQuantity() * orderGoods.getGoods().getPrice()))
                        .goodsId(orderGoods.getGoods().getGoodsId())
                        .goodsName(orderGoods.getGoods().getGoodsName())
                        .goodsText(orderGoods.getGoods().getGoodsText())
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
                        .orderStatus(order.getOrderStatus().getStepDescription())
                        .createdAt(order.getDateCreated())
                        .modifiedAt(order.getDateModified())
                        .orderGoodsList(orderGoodsListToOrderGoodsResponseDto(order.getOrderGoodsList()))
                        .build())
                .collect(Collectors.toList());
        responses.stream().forEach(response -> response.setPrice(
                response.getOrderGoodsList().stream().map(orderGoods -> orderGoods.getTotalPrice())
                        .mapToInt(p -> p).sum()
        ));
        return responses;
    }
}
