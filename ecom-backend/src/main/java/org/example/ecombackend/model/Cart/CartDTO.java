package org.example.ecombackend.model.Cart;
import org.example.ecombackend.model.CartItem.CartItemDTO;
import java.util.List;

public record CartDTO (
        Long id,
        List<CartItemDTO> items,
        double totalPrice
) {}