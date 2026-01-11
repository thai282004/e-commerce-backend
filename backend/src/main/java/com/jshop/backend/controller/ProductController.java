package com.jshop.backend.controller;

import com.jshop.backend.dto.ProductDTO;
import com.jshop.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping // định nghĩa phương thức post
    public ResponseEntity<ProductDTO>createProduct(@Valid @RequestBody ProductDTO productDTO){ // chuyen json -> dto
        ProductDTO newProduct=productService.createProduct(productDTO);
        return  ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }

    @GetMapping // định nghĩa phương thức post
    public ResponseEntity<Page<ProductDTO>>getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int  page,
            @RequestParam(defaultValue = "10") int limit
    ){
        Page<ProductDTO> productPage =productService.getProducts(keyword,page,limit);
        return ResponseEntity.ok(productPage);
    }
}
