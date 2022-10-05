package main.sswitch.order.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import main.sswitch.help.audit.BaseEntity;
import main.sswitch.user.entity.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@NoArgsConstructor
@Getter
@Entity(name = "ORDERS")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private String userName;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderGoods> orderGoodsList = new ArrayList<>();

    public void changeUser(User user) {
        if(this.user != null){
            this.user.getOrders().remove(this);
        }
        this.user = user;
        if(!user.getOrders().contains(this)){
            user.addOrder(this);
        }
    }
    public void changeUserName(String userName) {
        this.userName = userName;
    }

    public void resetInfo(User user){
        this.userName = user.getUserName();
    }


    public void addOrderGoods(OrderGoods orderGoods) {
        this.orderGoodsList.add(orderGoods);
        if (orderGoods.getOrder() != this) {
            orderGoods.addOrder(this);
        }
    }

    public String couponNum(int couponSize){
        final char[] possibleCharacters = {'1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F',
                'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
        final int possibleCharacterCount = possibleCharacters.length;
        String[] arr = new String[couponSize];
        Random rnd = new Random();
        int currentIndex = 0;
        int i = 0;
        while (currentIndex < couponSize) {
            StringBuffer buf = new StringBuffer(16);

            for (i= 16; i > 0; i--) {
                if(i == 12 || i == 8 || i == 4 )
                {
                    buf.append("-");
                }
                buf.append(possibleCharacters[rnd.nextInt(possibleCharacterCount)]);
            }
            String couponnum = buf.toString();
            System.out.println("couponnum==>"+couponnum);
            arr[currentIndex] = couponnum;
            currentIndex++;
        }
        return arr[0];
    }
}
