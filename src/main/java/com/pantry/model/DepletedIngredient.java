package com.pantry.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "depleted_ingredients")
public class DepletedIngredient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private LocalDateTime dateAdded;
    
    public DepletedIngredient(String name, String category) {
        this.name = name;
        this.category = category;
        this.dateAdded = LocalDateTime.now();
    }
    
    public DepletedIngredient(String name) {
        this.name = name;
        this.dateAdded = LocalDateTime.now();
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public LocalDateTime getDateAdded() {
        return dateAdded;
    }
    
    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }
    public String getCategory() { return category; }
public void setCategory(String category) { this.category = category; }
}
