package org.example.ecombackend.model.CartItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.ecombackend.model.Product.Product;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart_items")
public class CartItem
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
}
