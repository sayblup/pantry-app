package com.pantry.service;

import com.pantry.model.Ingredient;
import com.pantry.repository.IngredientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
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
    private String formatName(String name) {
        if (name == null || name.trim().isEmpty()) return name;
        name = name.trim();
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    }

    public List<Ingredient> getAll() {
        return ingredientRepository.findAll();
    }

  @Transactional
    public Ingredient addIngredient(String name, Double quantity, String unit, String category) {
        String formattedName = formatName(name); 
        
        Optional<Ingredient> existing = ingredientRepository.findByNameIgnoreCase(formattedName);
        if (existing.isPresent()) {
            Ingredient ingredient = existing.get();
            double converted = unitService.convert(quantity, unit, ingredient.getUnit());
            ingredient.setQuantity(ingredient.getQuantity() + converted);
            return ingredientRepository.save(ingredient);
        } else {
            Ingredient newIngredient = new Ingredient(formattedName, quantity, unit);
            newIngredient.setCategory(category);
            return ingredientRepository.save(newIngredient);
        }
    }

    @Transactional
    public Ingredient updateIngredient(Long id, Map<String, Object> fields) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        if (fields.containsKey("quantity"))
            ingredient.setQuantity(((Number) fields.get("quantity")).doubleValue());
        if (fields.containsKey("unit"))
            ingredient.setUnit((String) fields.get("unit"));
        if (fields.containsKey("category"))
            ingredient.setCategory((String) fields.get("category"));
        if (fields.containsKey("description"))
            ingredient.setDescription((String) fields.get("description"));
        return ingredientRepository.save(ingredient);
    }

    @Transactional
    public void markAsDepleted(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        depletedService.addDepleted(ingredient.getName(), ingredient.getCategory());
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
               depletedService.addDepleted(ingredient.getName(), ingredient.getCategory());
                ingredientRepository.delete(ingredient);
            } else {
                ingredient.setQuantity(newQuantity);
                ingredientRepository.save(ingredient);
            }
        }
    }
}
