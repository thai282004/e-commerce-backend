package com.jshop.backend.mapper;

import com.jshop.backend.dto.ProductDTO;
import com.jshop.backend.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel ="spring")
public interface ProductMapper{
    ProductDTO toDTO(Product product);

    @Mapping(target="id",ignore = true)
    @Mapping(target="createAt",ignore = true)
    @Mapping(target="updateAt",ignore=true)
    Product toEntity(ProductDTO productDTO);
}