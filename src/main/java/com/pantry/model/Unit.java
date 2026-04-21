package com.pantry.model;

import jakarta.persistence.*;

@Entity
@Table(name = "units")
public class Unit {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    private Double conversionFactor;
    
    private String baseUnit;
    
    public Unit() {}
    
    public Unit(String name, Double conversionFactor, String baseUnit) {
        this.name = name;
        this.conversionFactor = conversionFactor;
        this.baseUnit = baseUnit;
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
    
    public Double getConversionFactor() {
        return conversionFactor;
    }
    
    public void setConversionFactor(Double conversionFactor) {
        this.conversionFactor = conversionFactor;
    }
    
    public String getBaseUnit() {
        return baseUnit;
    }
    
    public void setBaseUnit(String baseUnit) {
        this.baseUnit = baseUnit;
    }
}
