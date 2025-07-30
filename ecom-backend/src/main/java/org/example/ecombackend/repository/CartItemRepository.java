package org.example.ecombackend.repository;
import org.example.ecombackend.model.Cart.Cart;
import org.example.ecombackend.model.CartItem.CartItem;
import org.example.ecombackend.model.Product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query(value = "SELECT * FROM cart_items ci WHERE ci.cart_id = ?1 AND ci.product_id = ?2", nativeQuery = true)
    CartItem findByCartAndProduct_Id(Long id, Long productId);

    boolean existsCartItemById(Long itemId);
}
