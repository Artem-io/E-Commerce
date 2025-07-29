package org.example.ecombackend.model;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.S3.S3Service;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class ProductDTOMapper implements Function<Product, ProductDTO>
{
    private final S3Service s3Service;

    @Override
    public ProductDTO apply(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getIsAvailable(),
                s3Service.getFileUrl(product.getImageName())
        );
    }
}
