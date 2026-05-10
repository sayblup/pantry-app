package com.pantry.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shopping_items")
public class ShoppingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double quantity;
    private String unit;
    private String category;
    private boolean checked = false;
    private LocalDateTime dateAdded;

    public ShoppingItem() { this.dateAdded = LocalDateTime.now(); }

    public ShoppingItem(String name, Double quantity, String unit, String category) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.category = category;
        this.dateAdded = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public boolean isChecked() { return checked; }
    public void setChecked(boolean checked) { this.checked = checked; }
    public LocalDateTime getDateAdded() { return dateAdded; }
    public void setDateAdded(LocalDateTime dateAdded) { this.dateAdded = dateAdded; }
}
