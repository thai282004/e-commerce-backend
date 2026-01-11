package com.jshop.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;


public record CategoryDTO(
        Long id,
        @NotBlank(message = " not blank")
        String name,
        List<ProductDTO> products
){}


