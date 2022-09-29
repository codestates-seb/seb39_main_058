package main.sswitch.order.service;

import lombok.AllArgsConstructor;
import main.sswitch.goods.service.GoodsService;
import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.order.entity.Order;
import main.sswitch.order.repository.OrderRepository;
import main.sswitch.user.entity.User;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class OrderService {
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final GoodsService goodsService;


//    public Order createOrder(Order order) {
//        verifyOrder(order);
//        Order savedOrder = saveOrder(order);
//        updateStamp(savedOrder);
//
//        return savedOrder;
//    }

    public Order updateOrder(Order order) {
        Order findOrder = findVerifiedOrder(order.getOrderId());

        Optional.ofNullable(order.getOrderStatus())
                .ifPresent(orderStatus -> findOrder.setOrderStatus(orderStatus));
        return orderRepository.save(findOrder);
    }

    public Order findOrder(long orderId) {
        return findVerifiedOrder(orderId);
    }

    public Page<Order> findOrders(int page, int size) {
        return orderRepository.findAll(PageRequest.of(page, size,
                Sort.by("orderId").descending()));
    }

    public void cancelOrder(long orderId) {
        Order findOrder = findVerifiedOrder(orderId);
        int step = findOrder.getOrderStatus().getStepNumber();

        // OrderStatus의 step이 2 이상일 경우(ORDER_CONFIRM)에는 주문 취소가 되지 않도록한다.
        if (step >= 2) {
            throw new BusinessLogicException(ExceptionCode.valueOf("CANNOT_CHANGE_ORDER"));
        }
        findOrder.setOrderStatus(Order.OrderStatus.ORDER_CANCEL);
        orderRepository.save(findOrder);
    }

    private Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order findOrder =
                optionalOrder.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return findOrder;
    }

    private void verifyOrder(Order order) {
        // 회원이 존재하는지 확인
        userService.findUserWithLoginId(order.getUser().getLoginId());

        // 커피가 존재하는지 확인
        order.getOrderGoods().stream()
                .forEach(orderGoods -> goodsService.
                        findVerifiedGoods(orderGoods.getGoods().getGoodsId()));
    }

//    private void updatePoint(Order order) {
//        User user = userService.findUserWithLoginId(order.getUser().getLoginId());
//        int leftPoint = StampCalculator.calculateEarnedStampCount(order);
//
//        Stamp stamp = member.getStamp();
//        stamp.setStampCount(
//                StampCalculator.calculatePoints(stamp.getStampCount(),
//                        earnedStampCount));
//        member.setStamp(stamp);
//
//        memberService.updateMember(member);
//    }

    private int calculatePoints(Order order) {
        return order.getOrderGoods().stream()
                .map(orderGoods -> orderGoods.getQuantity())
                .mapToInt(quantity -> quantity)
                .sum();
    }

    private Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

}
