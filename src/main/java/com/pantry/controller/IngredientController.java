package com.pantry.controller;

import com.pantry.model.Ingredient;
import com.pantry.service.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {
    
    private final IngredientService ingredientService;
    
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }
    
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAll();
    }
    
    @PostMapping
    public ResponseEntity<Ingredient> addIngredient(@RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        Double quantity = ((Number) request.get("quantity")).doubleValue();
        String unit = (String) request.get("unit");
        
        Ingredient ingredient = ingredientService.addIngredient(name, quantity, unit);
        return ResponseEntity.ok(ingredient);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        Double quantity = ((Number) request.get("quantity")).doubleValue();
        String unit = (String) request.get("unit");
        
        Ingredient ingredient = ingredientService.updateIngredient(id, quantity, unit);
        return ResponseEntity.ok(ingredient);
    }
    
    @DeleteMapping("/{id}/depleted")
    public ResponseEntity<Void> markAsDepleted(@PathVariable Long id) {
        ingredientService.markAsDepleted(id);
        return ResponseEntity.ok().build();
    }
}
