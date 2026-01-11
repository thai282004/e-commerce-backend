package com.jshop.backend.service;

import com.jshop.backend.dto.ProductDTO;
import com.jshop.backend.entity.Category;
import com.jshop.backend.entity.Product;
import com.jshop.backend.mapper.ProductMapper;
import com.jshop.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jshop.backend.repository.CategoryRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tự động Inject Repo và Mapper
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository; // Inject thêm cái này

    @Transactional // Đảm bảo tính toàn vẹn transaction
    public ProductDTO createProduct(ProductDTO productDTO) {
        // 1. Convert DTO -> Entity (lúc này product chưa có Category)
        Product product = productMapper.toEntity(productDTO);

        // 2. Tìm Category từ DB dựa vào ID gửi lên
        Category category = categoryRepository.findById(productDTO.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // 3. Gắn Category vào Product
        product.setCategory(category);

        // 4. Lưu xuống DB
        Product savedProduct = productRepository.save(product);

        return productMapper.toDTO(savedProduct);
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Page<ProductDTO>getProducts(String keyword,int page,int limit){
        //Tạo đối tượng pageable (trang số mấy, lấy bao nhiêu, sắp xếp theocais gì ?
        // sort.by().desceding() . sắp xếp theo id giảm
        Pageable pageable = PageRequest.of(page,limit, Sort.by("id").descending());

        Page<Product> productPage;

    if(keyword!=null && !keyword.isEmpty()){
        productPage=productRepository.findByNameContainingIgnoreCase(keyword,pageable);}
    else{
        productPage =productRepository.findAll(pageable);
    }
    return productPage.map(productMapper::toDTO);


    }
}