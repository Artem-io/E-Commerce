package org.example.ecombackend.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 60, message = "Name length cannot be greater than 60")
    String name;

    @NotBlank(message = "Description is required")
    @Size(max = 100, message = "Description length cannot be greater than 100")
    String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    BigDecimal price;

    @NotNull(message = "Availability status is required")
    Boolean isAvailable;

    private String imageUrl;
}
