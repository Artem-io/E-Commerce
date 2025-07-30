package org.example.ecombackend.model.CartItem;
import org.example.ecombackend.model.Product.ProductDTO;

public record CartItemDTO(
        Long id,
        ProductDTO product,
        int quantity
) {}
