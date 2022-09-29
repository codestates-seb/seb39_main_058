package main.sswitch.order.mapper;

import main.sswitch.goods.entity.Goods;
import main.sswitch.order.dto.OrderGoodsResponseDto;
import main.sswitch.order.dto.OrderPatchDto;
import main.sswitch.order.dto.OrderPostDto;
import main.sswitch.order.dto.OrderResponseDto;
import main.sswitch.order.entity.Order;
import main.sswitch.order.entity.OrderGoods;
import main.sswitch.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order orderPatchDtoToOrder(OrderPatchDto orderPatchDto);
    List<OrderResponseDto> ordersToOrderResponseDtos(List<Order> orders);

    default Order orderPostDtoToOrder(OrderPostDto orderPostDto) {
        Order order = new Order();
        User user = new User();
        user.setUserId(orderPostDto.getUserId());

        List<OrderGoods> orderGoodsList = orderPostDto.getOrderGoodsList().stream()
                .map(orderGoodsDto ->  {
                    OrderGoods orderGoods = new OrderGoods();
                    Goods goods = new Goods();
                    goods.setGoodsId(orderGoodsDto.getGoodsId());
                    orderGoods.addOrder(order);
                    orderGoods.addGoods(goods);
                    orderGoods.setQuantity(orderGoodsDto.getQuantity());
                    return orderGoods;
                }).collect(Collectors.toList());
        order.setUser(user);
        order.setOrderGoods(orderGoodsList);

        return order;
    }

    default OrderResponseDto orderToOrderResponseDto(Order order){
        List<OrderGoods> orderGoodsList = order.getOrderGoods();

        OrderResponseDto orderResponseDto = new OrderResponseDto();
        orderResponseDto.setOrderId(order.getOrderId());
        orderResponseDto.setUser(order.getUser());
        orderResponseDto.setOrderStatus(order.getOrderStatus());
        orderResponseDto.setCreatedAt(order.getDateCreated());
        orderResponseDto.setOrderGoods(
                orderGoodsToOrderGoodsResponseDtos(orderGoodsList)
        );

        return orderResponseDto;
    }

    default List<OrderGoodsResponseDto> orderGoodsToOrderGoodsResponseDtos(
            List<OrderGoods> orderGoodsList) {
        return orderGoodsList
                .stream()
                .map(orderGoods -> OrderGoodsResponseDto
                        .builder()
                        .goodsId(orderGoods.getGoods().getGoodsId())
                        .quantity(orderGoods.getQuantity())
                        .goodsPoint(orderGoods.getGoods().getGoodsPoint())
                        .goodsName(orderGoods.getGoods().getGoodsName())
                        .goodsText(orderGoods.getGoods().getGoodsText())
                        .build())
                .collect(Collectors.toList());
    }
}
