package com.jshop.backend.mapper;

import com.jshop.backend.dto.CategoryDTO;
import com.jshop.backend.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDTO toDTO(Category category);

    @Mapping(target = "products", ignore = true) // Tạm thời chưa map list products khi tạo
    Category toEntity(CategoryDTO categoryDTO);
}