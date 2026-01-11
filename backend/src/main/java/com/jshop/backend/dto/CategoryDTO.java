package com.jshop.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record CategoryDTO(
        Long id,

        @NotBlank(message = "Tên danh mục không được để trống")
        String name,

        // (Optional) Danh sách sản phẩm thuộc danh mục này (chỉ dùng khi GET chi tiết)
        List<ProductDTO> products
) {}