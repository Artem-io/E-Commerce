package org.example.ecombackend.service;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.S3.S3Service;
import org.example.ecombackend.model.Product;
import org.example.ecombackend.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProductService
{
    private final ProductRepository productRepo;
    private final S3Service s3Service;

    public Page<Product> getAllProducts(String name, Pageable pageable) {
        Page<Product> products = (name == null || name.trim().isEmpty())
                ? productRepo.findAll(pageable)
                : productRepo.findByNameContainingIgnoreCase(name, pageable);

        return products.map(product -> {
            String fileName = product.getId() + product.getName();
            product.setImageUrl(s3Service.getPresignedUrl(fileName));
            return product;
        });
    }

    public Product addProduct(Product product, MultipartFile file) throws IOException {
            if(file!=null && !file.isEmpty()) {
                productRepo.save(product);
                String fileName = product.getId() + product.getName();
                s3Service.uploadObject(fileName, file.getBytes());
            }
            return productRepo.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepo.findById(id).orElseThrow();
        String fileName = product.getId() + product.getName();
        s3Service.deleteObject(fileName);
        productRepo.deleteById(id);
    }
}
