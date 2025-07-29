package org.example.ecombackend.controller;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart;
import org.example.ecombackend.model.User;
import org.example.ecombackend.service.CartService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public Cart addToCart(Long productId, @AuthenticationPrincipal User user) {
        return cartService.addToCart(productId, user);
    }

    public Cart getCart(@AuthenticationPrincipal User user) {
        return cartService.getCart(user);
    }
}
