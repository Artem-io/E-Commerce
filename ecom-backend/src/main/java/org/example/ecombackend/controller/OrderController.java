package org.example.ecombackend.controller;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Order.Order;
import org.example.ecombackend.model.User;
import org.example.ecombackend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController
{
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getOrders(user));
    }

    @PostMapping("{cartId}")
    public ResponseEntity<Order> placeOrder(@PathVariable Long cartId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.placeOrder(cartId, user));
    }
}
