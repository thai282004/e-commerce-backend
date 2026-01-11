package com.jshop.backend.mapper;

import com.jshop.backend.dto.ProductDTO;
import com.jshop.backend.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    // Khi xuất ra: Lấy ID từ object Category bên trong Product
    @Mapping(source = "category.id", target = "categoryId")
    ProductDTO toDTO(Product product);

    // Khi nạp vào: Bỏ qua category, Service sẽ tự set sau
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Product toEntity(ProductDTO productDTO);
}