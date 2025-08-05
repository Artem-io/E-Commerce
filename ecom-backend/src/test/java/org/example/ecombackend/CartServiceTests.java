package org.example.ecombackend;
import org.example.ecombackend.model.Product.Product;
import org.example.ecombackend.model.Role;
import org.example.ecombackend.model.User;
import org.example.ecombackend.repository.ProductRepository;
import org.example.ecombackend.service.CartService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.Mockito.when;

class CartServiceTests
{
    @Mock
    private ProductRepository productRepo;

    private CartService cartService;

//    @Test
//    void shouldAddItemToCart() {
//        //Given
//        Long productId = 1L;
//        Product product = new Product(productId, "Test Product", "Test Description",
//                BigDecimal.valueOf(10.99), true, "test.jpg", new ArrayList<>());
//
//        User user = new User(1L, "user", "user", Role.ROLE_USER, null, null);
//
//        //When
//        when(productRepo.findById(productId)).thenReturn(Optional.of(product));
//
//        //Then
//    }


}
