package com.jshop.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name="categories")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name",nullable = false,unique=true)
    private String name;

    //Quan hệ 1-n: 1 danh mục nhiều sản phẩm
    //mappedby=category :trỏ tới biến categorry trong class Product
    //cascacde =cascadetype.all xóa danh mục thì xóa sản phẩm

    @OneToMany(mappedBy = "category",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Product> products;


}
