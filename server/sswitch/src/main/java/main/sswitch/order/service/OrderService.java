package main.sswitch.order.service;

import lombok.AllArgsConstructor;
import main.sswitch.goods.entity.Goods;
import main.sswitch.goods.service.GoodsService;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.order.dto.OrderGoodsDto;
import main.sswitch.order.dto.OrderPostDto;
import main.sswitch.order.dto.OrderResponseDto;
import main.sswitch.order.entity.Order;
import main.sswitch.order.entity.OrderGoods;
import main.sswitch.order.repository.OrderGoodsRepository;
import main.sswitch.order.repository.OrderRepository;
import main.sswitch.user.entity.User;
import main.sswitch.user.repository.UserRepository;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class OrderService {
    private final UserService userService;

    private final OrderRepository orderRepository;

    private final OrderGoodsRepository orderGoodsRepository;
    private final GoodsService goodsService;


    public Order createOrder(OrderPostDto requestBody, String userName){
        User user = userService.findUserWithUserName(userName);
        List<OrderGoodsDto> orderGoodsList = requestBody.getOrderGoodsList();
        Order order = new Order();  // Order 생성
        order.changeUser(user); // Order-User 연관관계 설정

        orderInformation(requestBody, user, order); // 주문 정보 설정

        for (OrderGoodsDto orderGoodsDto : orderGoodsList) {
            Goods goods = goodsService.findVerifiedGoodsName(orderGoodsDto.getGoodsName()); // 상품 검증
            OrderGoods orderGoods = OrderGoods // OrderGoods 생성
                    .builder()
                    .user(user)
                    .goods(goods)
                    .quantity(orderGoodsDto.getQuantity())
                    .build();
            orderGoods.addOrder(order);
            orderGoodsRepository.save(orderGoods);
        }

        order.updateOrderStatus(Order.OrderStatus.ORDER_REQUEST);
        return orderRepository.save(order);

    }

    public Order findOrder(Long orderId){
        return findVerifiedOrder(orderId);
    }

    public Page<Order> findOrders(long userId, int page, int size){
        User User = userService.findUserWithId(userId);
        return orderRepository.findAllByUser(User, PageRequest.of(page, size,
                Sort.by("orderId").descending()));
    }

    public Order updateOrder(Long orderId, String orderStatus){
        Order order = findVerifiedOrder(orderId);
        order.updateOrderStatus(Order.OrderStatus.of(orderStatus));
        return order;
    }

    public void cancelOrder(Long orderId){
        Order findOrder = findVerifiedOrder(orderId);
        int step = findOrder.getOrderStatus().getStepNumber();
        if(step > 2){
            throw new BusinessLogicException(ExceptionCode.valueOf("CANNOT_CHANGE_ORDER"));
        }
        findOrder.updateOrderStatus(Order.OrderStatus.ORDER_CANCEL);
    }

    public Order findVerifiedOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
    }

    public void orderInformation(OrderPostDto requestBody, User User, Order order) {
        String userName = requestBody.getUserName();
        User findUser = userService.findUserWithUserName(userName);
        if(userName != null){
            order.changeUserName(userName);
        } else {
            order.resetInfo(User);
        }
    }

}
