package org.example.ecombackend.service;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.Cart.CartDTO;
import org.example.ecombackend.model.Cart.CartDTOMapper;
import org.example.ecombackend.model.CartItem.CartItem;
import org.example.ecombackend.model.Product.Product;
import org.example.ecombackend.model.User;
import org.example.ecombackend.repository.CartItemRepository;
import org.example.ecombackend.repository.CartRepository;
import org.example.ecombackend.repository.ProductRepository;
import org.example.ecombackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService
{
    private final CartRepository cartRepo;
    private final UserRepository userRepo;
    private final CartItemRepository cartItemRepo;
    private final ProductRepository productRepo;
    private final CartDTOMapper cartDTOMapper;

    @Transactional
    public CartDTO addToCart(Long productId, User user) {
        Cart cart;
        if(user.getCart() == null) {
            cart = new Cart();
            user.setCart(cart);
        }
        else cart = user.getCart();

        CartItem existingCartItem = cartItemRepo.findByCartAndProduct_Id(cart.getId(), productId);
        if(existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
            cartItemRepo.save(existingCartItem);
            return cartDTOMapper.apply(cart);
        }

        Product product = productRepo.findById(productId).orElseThrow();
        CartItem cartItem = new CartItem(null, product, 1);
        cart.getItems().add(cartItem);

        userRepo.save(user);
        return cartDTOMapper.apply(cartRepo.save(cart));
    }

    public CartDTO getCart(User user) {
        return cartDTOMapper.apply(user.getCart());
    }

    public void deleteCartItem(Long itemId, User user)
    {
        CartItem cartItem = cartItemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        Cart cart = user.getCart();
        if (cart == null || !cartItemRepo.existsCartItemById(itemId))
            throw new RuntimeException("Cart item does not belong to user's cart");

        cart.getItems().remove(cartItem);
        cartItemRepo.deleteById(itemId);
    }
}