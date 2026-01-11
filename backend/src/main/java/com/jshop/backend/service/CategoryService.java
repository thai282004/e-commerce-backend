package com.jshop.backend.service;

import com.jshop.backend.dto.CategoryDTO;
import com.jshop.backend.entity.Category;
import com.jshop.backend.mapper.CategoryMapper;
import com.jshop.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDTO> getAllCategories(){
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());
    }
    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO){
        Category category=categoryMapper.toEntity(categoryDTO);
        Category savedCategory=categoryRepository.save(category);
        return categoryMapper.toDTO(savedCategory);
    }


    public Category getCategoryEntityById(Long Id){
        return categoryRepository.findById(Id)
                .orElseThrow(()-> new RuntimeException("cannot find category by this id: " + Id ));
    }


}