package com.pantry.controller;

import com.pantry.model.DepletedIngredient;
import com.pantry.service.DepletedIngredientService;
import com.pantry.service.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/depleted")
public class DepletedIngredientController {
    
    private final DepletedIngredientService depletedService;
    private final IngredientService ingredientService;
    
    public DepletedIngredientController(DepletedIngredientService depletedService,
                                       IngredientService ingredientService) {
        this.depletedService = depletedService;
        this.ingredientService = ingredientService;
    }
    
    @GetMapping
    public List<DepletedIngredient> getAllDepleted() {
        return depletedService.getAll();
    }
    
    @PostMapping("/{id}/restore")
    public ResponseEntity<Void> restoreToInventory(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        
        DepletedIngredient depleted = depletedService.getAll().stream()
            .filter(d -> d.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Depleted ingredient not found"));
        
        Double quantity = ((Number) request.get("quantity")).doubleValue();
        String unit = (String) request.get("unit");
        
        ingredientService.addIngredient(depleted.getName(), quantity, unit, "Inne");
        depletedService.removeDepleted(id);
        
        return ResponseEntity.ok().build();
    }
}
