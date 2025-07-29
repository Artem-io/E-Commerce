package org.example.ecombackend.model;
import java.math.BigDecimal;

public record ProductDTO (
        Long id,
        String name,
        String description,
        BigDecimal price,
        Boolean isAvailable,
        String imageUrl
) {}
