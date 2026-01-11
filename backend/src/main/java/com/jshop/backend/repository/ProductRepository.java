package com.jshop.backend.repository;

import com.jshop.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>{
    // Tìm kiếm theo tên (chứa từ khóa), không phân biệt hoa thường, và có phân trang
    // Tương đương SQL: SELECT * FROM products WHERE lower(name) LIKE %keyword% LIMIT 10 OFFSET 0
    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
