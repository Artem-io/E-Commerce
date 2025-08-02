package org.example.ecombackend.controller;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.Cart.CartDTO;
import org.example.ecombackend.model.User;
import org.example.ecombackend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    @PostMapping("{productId}") //Add a new Item or increment quantity of an existing item
    public ResponseEntity<CartDTO> addToCart(@PathVariable Long productId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.addToCart(productId, user));
    }

    @PutMapping("{itemId}") //Decrement quantity of an existing item
    public ResponseEntity<CartDTO> removeFromCart(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.removeFromCart(itemId, user));
    }

    @GetMapping
    public ResponseEntity<CartDTO> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @DeleteMapping("{itemId}") //Fully delete cart item
    public ResponseEntity<?> deleteCartItem(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        cartService.deleteCartItem(itemId, user);
        return ResponseEntity.noContent().build();
    }
}
