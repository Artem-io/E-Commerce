package org.example.ecombackend;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.Cart.CartDTOMapper;
import org.example.ecombackend.model.CartItem.CartItem;
import org.example.ecombackend.model.Product.Product;
import org.example.ecombackend.model.Role;
import org.example.ecombackend.model.User;
import org.example.ecombackend.repository.CartItemRepository;
import org.example.ecombackend.repository.CartRepository;
import org.example.ecombackend.repository.ProductRepository;
import org.example.ecombackend.service.CartService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CartServiceTests
{
    @Mock
    private ProductRepository productRepo;

    @Mock
    private CartItemRepository cartItemRepo;

    @Mock
    private CartRepository cartRepo;

    @Mock
    private CartDTOMapper cartDTOMapper;

    @InjectMocks
    private CartService cartService;



    @Test
    void shouldDeleteCartItem() {
        // Given
        Long itemId = 1L;
        CartItem cartItem = mock(CartItem.class);
        Cart cart = new Cart(1L, new ArrayList<>());
        cart.getItems().add(cartItem);
        User user = new User(1L, "user", "password", Role.ROLE_USER, cart, null);
        
        when(cartItemRepo.findByIdAndCart(itemId, cart.getId())).thenReturn(cartItem);
        
        // When
        cartService.deleteCartItem(itemId, user);
        
        // Then
        verify(cartItemRepo).findByIdAndCart(itemId, cart.getId());
        verify(cartItemRepo).deleteById(itemId);
        assertFalse(cartItemRepo.existsById(itemId));
    }

    @Test
    void shouldThrowWhenItemBelongsToAnotherCart() {
        // Given
        Long itemId = 1L;
        Cart cart = new Cart(1L, new ArrayList<>());
        User user = new User(1L, "user", "password", Role.ROLE_USER, cart, null);

        when(cartItemRepo.findByIdAndCart(itemId, cart.getId())).thenReturn(null);

        // When & Then
        assertThrows(RuntimeException.class, () -> cartService.deleteCartItem(itemId, user));
        verify(cartItemRepo).findByIdAndCart(itemId, cart.getId());
        verifyNoMoreInteractions(cartItemRepo);
    }

    @Test
    void shouldReduceItemQuantity() {
        //Given
        Long itemId = 1L;
        Cart cart = new Cart(5L, new ArrayList<>());
        User user = new User(3L, "user", "password", Role.ROLE_USER, cart, null);
        CartItem cartItem = new CartItem(itemId, mock(Product.class), 3);

        when(cartItemRepo.findByIdAndCart(itemId, cart.getId())).thenReturn(cartItem);

        //When
        cartService.reduceQuantity(itemId, user);

        //Then
        verify(cartItemRepo).findByIdAndCart(itemId, cart.getId());
        verify(cartItemRepo).save(cartItem);
        verify(cartDTOMapper).apply(cart);
        assertEquals(2, cartItem.getQuantity());
    }

    @Test
    void shouldThrowWhenCartIsNull() {
        assertThrows(RuntimeException.class, () -> cartService.reduceQuantity(1L, mock(User.class)));
        verifyNoInteractions(cartItemRepo);
        verifyNoInteractions(cartDTOMapper);
    }

    @Test
    void shouldThrowWhenCartItemNotFound() {
        Long itemId = 1L;
        User user = new User(3L, "user", "password", Role.ROLE_USER, mock(Cart.class), null);

        when(cartItemRepo.findByIdAndCart(itemId, user.getCart().getId())).thenReturn(null);

        assertThrows(RuntimeException.class, () -> cartService.reduceQuantity(1L, user));
        verify(cartItemRepo).findByIdAndCart(itemId, user.getCart().getId());
        verifyNoMoreInteractions(cartItemRepo);
    }
}