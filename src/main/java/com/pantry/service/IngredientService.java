package com.pantry.service;

import com.pantry.model.Ingredient;
import com.pantry.model.DepletedIngredient;
import com.pantry.repository.IngredientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {
    
    private final IngredientRepository ingredientRepository;
    private final UnitService unitService;
    private final DepletedIngredientService depletedService;
    
    public IngredientService(IngredientRepository ingredientRepository, 
                           UnitService unitService,
                           DepletedIngredientService depletedService) {
        this.ingredientRepository = ingredientRepository;
        this.unitService = unitService;
        this.depletedService = depletedService;
    }
    
    public List<Ingredient> getAll() {
        return ingredientRepository.findAll();
    }
    
    @Transactional
    public Ingredient addIngredient(String name, Double quantity, String unit) {
        Optional<Ingredient> existing = ingredientRepository.findByNameIgnoreCase(name);
        
        if (existing.isPresent()) {
            Ingredient ingredient = existing.get();
            double converted = unitService.convert(quantity, unit, ingredient.getUnit());
            ingredient.setQuantity(ingredient.getQuantity() + converted);
            return ingredientRepository.save(ingredient);
        } else {
            Ingredient newIngredient = new Ingredient(name, quantity, unit);
            return ingredientRepository.save(newIngredient);
        }
    }
    
    @Transactional
    public Ingredient updateIngredient(Long id, Double quantity, String unit) {
        Ingredient ingredient = ingredientRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        ingredient.setQuantity(quantity);
        ingredient.setUnit(unit);
        return ingredientRepository.save(ingredient);
    }
    
    @Transactional
    public void markAsDepleted(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        depletedService.addDepleted(ingredient.getName());
        ingredientRepository.deleteById(id);
    }
    
    @Transactional
    public void subtractQuantity(String name, Double quantity, String unit) {
        Optional<Ingredient> optional = ingredientRepository.findByNameIgnoreCase(name);
        
        if (optional.isPresent()) {
            Ingredient ingredient = optional.get();
            double converted = unitService.convert(quantity, unit, ingredient.getUnit());
            double newQuantity = ingredient.getQuantity() - converted;
            
            if (newQuantity <= 0) {
                depletedService.addDepleted(ingredient.getName());
                ingredientRepository.delete(ingredient);
            } else {
                ingredient.setQuantity(newQuantity);
                ingredientRepository.save(ingredient);
            }
        }
    }
}
