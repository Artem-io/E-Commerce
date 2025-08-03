package org.example.ecombackend.service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.Order.Order;
import org.example.ecombackend.model.User;
import org.example.ecombackend.repository.CartItemRepository;
import org.example.ecombackend.repository.CartRepository;
import org.example.ecombackend.repository.OrderRepository;
import org.example.ecombackend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService
{
    private final OrderRepository orderRepo;
    private final CartRepository cartRepo;
    private final UserRepository userRepo;
    private final CartItemRepository cartItemRepo;

    public List<Order> getOrders(User user) {
        return user.getOrders();
    }

    @Transactional
    public Order placeOrder(Long cartId, User user) {
        Cart cart = cartRepo.findById(cartId).orElseThrow();
        Order order = new Order(null, LocalDateTime.now(), cart.getItems(), cart.calculateTotalPrice());
        user.getOrders().add(order);
        userRepo.save(user);
        cartItemRepo.deleteAllByCart(cart.getId());
        cart.getItems().clear();
        return order;
    }
}
