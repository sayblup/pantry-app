package com.pantry.controller;

import com.pantry.model.Recipe;
import com.pantry.model.RecipeIngredient;
import com.pantry.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    
    private final RecipeService recipeService;
    
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }
    
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAll();
    }
    
    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeService.getById(id);
    }
    
    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> ingredientsList = (List<Map<String, Object>>) request.get("ingredients");
        Recipe recipe = recipeService.createRecipe(name, ingredientsList);
        return ResponseEntity.ok(recipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/execute")
    public ResponseEntity<Void> executeRecipe(
            @PathVariable Long id,
            @RequestBody List<RecipeIngredient> selectedIngredients) {
        
        recipeService.executeRecipe(id, selectedIngredients);
        return ResponseEntity.ok().build();
    }
}
