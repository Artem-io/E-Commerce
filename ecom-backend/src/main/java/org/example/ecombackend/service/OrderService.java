package org.example.ecombackend.service;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.Order.Order;
import org.example.ecombackend.repository.CartRepository;
import org.example.ecombackend.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderService
{
    private final OrderRepository orderRepo;
    private final CartRepository cartRepo;

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepo.findAll(pageable);
    }

    public Order placeOrder(Long cartId) {
        Cart cart = cartRepo.findById(cartId).orElseThrow();
        Order order = new Order(null, LocalDateTime.now(), cart);
        cart.setItems(null);
        cartRepo.deleteById(cartId);
        return orderRepo.save(order);
    }
}
