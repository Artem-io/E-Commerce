package org.example.ecombackend.service;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.Cart.CartDTO;
import org.example.ecombackend.model.Cart.CartDTOMapper;
import org.example.ecombackend.model.CartItem.CartItem;
import org.example.ecombackend.model.Product.Product;
import org.example.ecombackend.model.User;
import org.example.ecombackend.repository.CartRepository;
import org.example.ecombackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepo;
    private final ProductService productService;
    private final UserRepository userRepo;
    private final CartDTOMapper cartDTOMapper;

    public Cart addToCart(Long productId, User user) {
        Cart cart;
        if(user.getCart() == null) {
            cart = new Cart();
            user.setCart(cart);
        }
        else cart = user.getCart();

        Product product = productService.getProductById(productId);
        CartItem cartItem = new CartItem(null, product, 1);
        cart.getItems().add(cartItem);
        userRepo.save(user);

        return cartRepo.save(cart);
    }

    public CartDTO getCart(User user) {
        return cartDTOMapper.apply(user.getCart());
    }
}
