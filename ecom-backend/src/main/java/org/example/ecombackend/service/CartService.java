package org.example.ecombackend.service;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart;
import org.example.ecombackend.model.CartItem;
import org.example.ecombackend.model.Product;
import org.example.ecombackend.model.User;
import org.example.ecombackend.repository.CartRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepo;
    private final ProductService productService;

    public Cart addToCart(Long productId, User user) {

            Cart cart = cartRepo.save(new Cart());
            user.setCart(cart);
            Product product = productService.getProductById(productId);
            CartItem cartItem = new CartItem(null, product, 1);
            cart.getItems().add(cartItem);
            return cartRepo.save(cart);

    }

    public Cart getCart(User user) {
        return user.getCart();
    }
}
