package org.example.ecombackend.model.Cart;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.CartItem.CartItemDTOMapper;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class CartDTOMapper implements Function<Cart, CartDTO>
{
    private final CartItemDTOMapper cartItemDTOMapper;
    
    @Override
    public CartDTO apply(Cart cart) {
        return new CartDTO(
                cart.getId(),
                cart.getItems().stream()
                    .map(cartItemDTOMapper)
                    .toList(),
                cart.getTotalPrice()
        );
    }
}