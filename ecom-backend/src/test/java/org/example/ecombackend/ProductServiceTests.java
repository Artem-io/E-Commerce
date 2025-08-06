package org.example.ecombackend;
import org.example.ecombackend.S3.S3Service;
import org.example.ecombackend.model.Product.Product;
import org.example.ecombackend.model.Product.ProductDTO;
import org.example.ecombackend.model.Product.ProductDTOMapper;
import org.example.ecombackend.repository.ProductRepository;
import org.example.ecombackend.service.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTests
{
    @Mock
    S3Service s3Service;

    @Mock
    ProductRepository productRepo;

    @Mock
    ProductDTOMapper productDtoMapper;

    @InjectMocks
    ProductService productService;

    @Test
    void shouldAddProductWithImage() throws IOException {
        //Given
        Product product = new Product(1L, "name", "description", new BigDecimal(20), true, null, new ArrayList<>());
        MultipartFile file = mock(MultipartFile.class);

        ProductDTO productDTO = new ProductDTO(1L, "name", "description",
                new BigDecimal(20), true, "some-url");

        when(file.getOriginalFilename()).thenReturn("test-image.jpg");
        when(file.getBytes()).thenReturn("test-bytes".getBytes());
        when(productRepo.save(product)).thenReturn(product);
        when(productDtoMapper.apply(product)).thenReturn(productDTO);

        //When
        ProductDTO result = productService.addProduct(product, file);

        //Then
        assertThat(result).isEqualTo(productDTO);
        verify(productRepo).save(product);
        verify(s3Service).uploadObject("test-image.jpg", "test-bytes".getBytes());
        verify(productDtoMapper).apply(product);
    }


    @Test
    void shouldNotAddProductWithoutFile() throws IOException {
        //Given
        Product product = new Product(1L, "name", "description", new BigDecimal(20), true, null, new ArrayList<>());

        //Then
        assertThrows(IllegalArgumentException.class, () -> productService.addProduct(product, null));

        verifyNoInteractions(s3Service);
        verifyNoInteractions(productRepo);
        verifyNoInteractions(productDtoMapper);
    }


    @Test
    void shouldUpdateProductWithImage() throws IOException {
        //Given
        Long productId = 1L;
        Product oldProduct = new Product(productId, "old_name", "old_description", new BigDecimal(596), false, "some_name", new ArrayList<>());
        Product newProduct = new Product(productId, "new_name", "new_description", new BigDecimal(20), true, null, new ArrayList<>());
        MultipartFile file = mock(MultipartFile.class);

        ProductDTO expected = new ProductDTO(productId, "new_name", "new_description", new BigDecimal(20), true, null);

        when(productRepo.findById(productId)).thenReturn(Optional.of(oldProduct));
        when(productRepo.save(newProduct)).thenReturn(newProduct);
        when(productDtoMapper.apply(newProduct)).thenReturn(expected);

        //When
        ProductDTO result = productService.updateProduct(newProduct, file);

        //Then
        assertThat(result).isEqualTo(expected);
        verify(s3Service).deleteObject(oldProduct.getImageName());
        verify(s3Service).uploadObject(file.getOriginalFilename(), file.getBytes());
        verify(productRepo).save(newProduct);
        verify(productDtoMapper).apply(newProduct);
    }


    @Test
    void shouldUpdateProductWithoutImage() throws IOException {
        //Given
        Long productId = 1L;
        Product oldProduct = new Product(productId, "old_name", "old_description", new BigDecimal(596), false, "some_name", new ArrayList<>());
        Product newProduct = new Product(productId, "new_name", "new_description", new BigDecimal(20), true, null, new ArrayList<>());

        ProductDTO expected = new ProductDTO(productId, "new_name", "new_description", new BigDecimal(20), true, null);

        when(productRepo.findById(productId)).thenReturn(Optional.of(oldProduct));
        when(productRepo.save(newProduct)).thenReturn(newProduct);
        when(productDtoMapper.apply(newProduct)).thenReturn(expected);

        //When
        ProductDTO result = productService.updateProduct(newProduct, null);

        //Then
        assertThat(result).isEqualTo(expected);
        verifyNoInteractions(s3Service);
        verify(productRepo).save(newProduct);
        verify(productDtoMapper).apply(newProduct);
    }


    @Test
    void shouldDeleteProduct() {
        //Given
        Product product = new Product(1L, "name", "description", new BigDecimal(20), true, "some_image_name", new ArrayList<>());
        when(productRepo.findById(product.getId())).thenReturn(Optional.of(product));

        //When
        productService.deleteProduct(product.getId());

        //Then
        verify(productRepo).deleteById(product.getId());
        verify(s3Service).deleteObject(product.getImageName());
    }


    @Test
    void shouldFindProductById() {
        //Given
        Long productId = 1L;
        Product product = new Product(productId, "name", "description", new BigDecimal(20), true, "some_image_name", new ArrayList<>());
        ProductDTO expected = new ProductDTO(productId, "name", "description", new BigDecimal(20), true, null);

        when(productRepo.findById(productId)).thenReturn(Optional.of(product));
        when(productDtoMapper.apply(product)).thenReturn(expected);

        //When
        ProductDTO result = productService.getProductById(productId);

        //Then
        assertThat(result).isEqualTo(expected);
        verify(productRepo).findById(productId);
        verify(productDtoMapper).apply(product);
        verifyNoInteractions(s3Service);
    }
}