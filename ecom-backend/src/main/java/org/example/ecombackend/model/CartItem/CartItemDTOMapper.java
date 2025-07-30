package org.example.ecombackend.model.CartItem;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Product.ProductDTOMapper;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class CartItemDTOMapper implements Function<CartItem, CartItemDTO>
{
    private final ProductDTOMapper productDTOMapper;

    @Override
    public CartItemDTO apply(CartItem cartItem) {
        return new CartItemDTO(
                cartItem.getId(),
                productDTOMapper.apply(cartItem.getProduct()),
                cartItem.getQuantity());
    }
}
