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

public class Category{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name",nullable = false,unique=true)
    private String name;

    @OneToMany(mappedBy="category",cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Product> products;
}
