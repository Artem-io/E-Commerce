package org.example.ecombackend.controller;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Order.Order;
import org.example.ecombackend.model.Product.ProductDTO;
import org.example.ecombackend.model.User;
import org.example.ecombackend.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController
{
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<Order>> getAllOrders(@PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(orderService.getAllOrders(pageable));
    }

    @PostMapping("{cartId}")
    public ResponseEntity<Order> placeOrder(@PathVariable Long cartId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.placeOrder(cartId, user));
    }
}
