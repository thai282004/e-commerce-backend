package com.jshop.backend.dto;


import jakarta.validation.constraints.*;
import java.math.BigDecimal;


public record ProductDTO (
    Long id,
    @NotBlank(message="Tên không được để trống")
    String name,

    @NotNull(message = "Gía không được để trống")
    @Min(value=0,message = "Gía phải lớn hơn không")
    BigDecimal price,

    String thumbnail,
    String description,

    @Min(message = "Số lượng phải >=0",value = 0)
    Integer stockQuantity) {}
