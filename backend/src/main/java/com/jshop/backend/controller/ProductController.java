package com.jshop.backend.controller;

import com.jshop.backend.dto.ProductDTO;
import com.jshop.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDTO>createProduct(@Valid @RequestBody ProductDTO productDTO){
        ProductDTO newProduct=productService.createProduct(productDTO);
        return  ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>>getAllProduct(){
        return ResponseEntity.ok(productService.getAllProducts());
    }



}
