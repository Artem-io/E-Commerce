package org.example.ecombackend.controller;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.Cart.CartDTO;
import org.example.ecombackend.model.User;
import org.example.ecombackend.service.CartService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    @PostMapping("{productId}")
    public Cart addToCart(@PathVariable Long productId, @AuthenticationPrincipal User user) {
        return cartService.addToCart(productId, user);
    }

    @GetMapping
    public CartDTO getCart(@AuthenticationPrincipal User user) {
        return cartService.getCart(user);
    }
}
