package com.jshop.backend.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name="products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name",nullable=false,length=350)
    private String name;

    @Column(name="price",nullable=false)
    private BigDecimal price;

    @Column(name="thumbnail",length=400)
    private String thumbnail;

    @Column(name="description",columnDefinition="text")
    private String description;

    @Column(name="stock_quantity",nullable=false)
    private Integer stockQuantity;

    //Audit field

    @Column(name="create_at")
    private LocalDateTime createAt;

    @Column(name="update_at")
    private LocalDateTime updateAt;

    @PrePersist
    protected void onCreate(){
        createAt=LocalDateTime.now();
        updateAt=LocalDateTime.now();

    }

    @PreUpdate
    protected void onUpdate(){
        updateAt=LocalDateTime.now();
    }







}

