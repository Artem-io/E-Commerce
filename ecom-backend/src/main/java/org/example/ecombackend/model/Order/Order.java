package org.example.ecombackend.model.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.CartItem.CartItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "orders")
public class Order
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items = new ArrayList<>();

    private BigDecimal totalPrice;

    public Order(Long id, LocalDateTime date, List<CartItem> items, BigDecimal totalPrice) {
        setId(id);
        setOrderDate(date);
        setTotalPrice(totalPrice);

        for(CartItem item : items)
            this.items.add(new OrderItem(null, item.getProduct().getName(),
                    item.getProduct().getPrice(), item.getQuantity()));
    }
}
