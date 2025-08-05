package org.example.ecombackend.service;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.S3.S3Service;
import org.example.ecombackend.model.Product.Product;
import org.example.ecombackend.model.Product.ProductDTO;
import org.example.ecombackend.model.Product.ProductDTOMapper;
import org.example.ecombackend.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProductService
{
    private final ProductRepository productRepo;
    private final S3Service s3Service;
    private final ProductDTOMapper productDtoMapper;

    public Page<ProductDTO> getAllProducts(String name, Pageable pageable) {
        Page<Product> products = (name == null || name.trim().isEmpty())
                ? productRepo.findAll(pageable)
                : productRepo.findByNameContainingIgnoreCase(name, pageable);

        return products.map(productDtoMapper);
    }

    @Transactional
    public ProductDTO addProduct(Product product, MultipartFile file) throws IOException {
        if(file == null || file.isEmpty()) throw new IllegalArgumentException("Invalid file");

        s3Service.uploadObject(file.getOriginalFilename(), file.getBytes());
        product.setImageName(file.getOriginalFilename());
        return productDtoMapper.apply(productRepo.save(product));
    }

    @Transactional
    public ProductDTO updateProduct(Product updatedProduct, MultipartFile file) throws IOException {
        Product oldProduct = productRepo.findById(updatedProduct.getId()).orElseThrow();

        if(file != null && !file.isEmpty()) {
            s3Service.deleteObject(oldProduct.getImageName());
            s3Service.uploadObject(file.getOriginalFilename(), file.getBytes());
            updatedProduct.setImageName(file.getOriginalFilename());
        }
        else updatedProduct.setImageName(oldProduct.getImageName());

        return productDtoMapper.apply(productRepo.save(updatedProduct));
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepo.findById(id).orElseThrow();
        s3Service.deleteObject(product.getImageName());
        productRepo.deleteById(id);
    }

    public ProductDTO getProductById(Long id) {
        return productDtoMapper.apply(productRepo.findById(id).orElseThrow());
    }
}
