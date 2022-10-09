package main.sswitch.order.controller;

import lombok.RequiredArgsConstructor;

import main.sswitch.help.exceptions.BusinessLogicException;
import main.sswitch.help.exceptions.ExceptionCode;
import main.sswitch.help.response.dto.MultiResponseDto;
import main.sswitch.help.response.dto.SingleResponseDto;

import main.sswitch.order.dto.CouponDto;
import main.sswitch.order.dto.OrderPostDto;
import main.sswitch.order.dto.OrderResponseDto;
import main.sswitch.order.entity.Order;
import main.sswitch.order.entity.OrderGoods;
import main.sswitch.order.mapper.OrderMapper;
import main.sswitch.order.service.OrderService;
import main.sswitch.security.oauth.PrincipalDetails;
import main.sswitch.user.entity.User;
import main.sswitch.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderMapper mapper;
    private final OrderService orderService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity createOrder(@RequestBody OrderPostDto requestBody) {
        String userName = requestBody.getUserName();
        Order savedOrder = orderService.createOrder(requestBody, userName);
        OrderResponseDto response = mapper.orderToOrderResponseDto(savedOrder);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @GetMapping("/{order-id}")
    public ResponseEntity getOrder(@PathVariable("order-id") @Positive long orderId) {
        Order order = orderService.findOrder(orderId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.orderToOrderResponseDto(order)),
                HttpStatus.OK);
    }

    @GetMapping("/orderGoods/list/{user-id}")
    public ResponseEntity getOrderGoods(@PathVariable("user-id") @Positive long userId){
        List<OrderGoods> orderGoods = orderService.findOrderGoodsWithUserId(userId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.ordersToOrderGoodsResponseDto(orderGoods)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getOrders(@RequestParam long id,
                                    @Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Order> pageOrders = orderService.findOrders(id, page-1, size);
        List<Order> orders = pageOrders.getContent();
        List<OrderResponseDto> response = mapper.ordersToOrderResponseDto(orders);
        return new ResponseEntity<>(
                new MultiResponseDto<>(response, pageOrders),
                HttpStatus.OK);
    }

    @DeleteMapping("/orderGoods/{order-goods-id}")
    public ResponseEntity deleteOrderGoods(@PathVariable("order-goods-id") @Positive long orderGoodsId) {
        orderService.cancelOrderGoods(orderGoodsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{order-id}")
    public ResponseEntity cancelOrder(@PathVariable("order-id") @Positive long orderId) {
        orderService.cancelOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/coupon")
    public ResponseEntity coupon(@AuthenticationPrincipal PrincipalDetails principal, @RequestBody CouponDto couponDto) {
        User findUser = userService.findUserWithLoginId(principal.getUsername());
        String fixedCoupon = couponDto.getCoupon().toUpperCase();
        if (fixedCoupon.equals("SSWITCHISTHEBEST")) {
            userService.updatePoints(findUser, findUser.getCurrentPoints(), 0, findUser.getTotalPoints(), 50000);
        }
        else throw new BusinessLogicException(ExceptionCode.ORDER_EXITS);
        return new ResponseEntity<>("쿠폰 적용", HttpStatus.OK);
    }
}