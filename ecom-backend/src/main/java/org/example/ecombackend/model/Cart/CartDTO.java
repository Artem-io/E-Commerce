package org.example.ecombackend.model.Cart;
import org.example.ecombackend.model.CartItem.CartItemDTO;
import java.math.BigDecimal;
import java.util.List;

public record CartDTO (
        Long id,
        List<CartItemDTO> items,
        BigDecimal totalPrice
) {}