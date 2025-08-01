package org.example.ecombackend.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Product.Product;
import org.example.ecombackend.model.Product.ProductDTO;
import org.example.ecombackend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController
{
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(@RequestParam(value = "name", required = false) String name,
                                                           @PageableDefault(size = 20) Pageable pageable) {
        //pageable syntax: products?page=0&size=10&sort=name,asc
        return ResponseEntity.ok(productService.getAllProducts(name, pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> addProduct(@Valid @ModelAttribute Product product,
                                              @RequestParam(value = "file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(productService.addProduct(product, file));
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> updateProduct(@Valid @ModelAttribute Product product,
                                              @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(productService.updateProduct(product, file));
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
