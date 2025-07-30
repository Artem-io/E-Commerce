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

    public Product addProduct(Product product, MultipartFile file) throws IOException {
            if(file!=null && !file.isEmpty()) {
                String fileName = file.getOriginalFilename();
                product.setImageName(fileName);
                s3Service.uploadObject(fileName, file.getBytes());
            }
            return productRepo.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepo.findById(id).orElseThrow();
        s3Service.deleteObject(product.getImageName());
        productRepo.deleteById(id);
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id).orElseThrow();
    }
}
