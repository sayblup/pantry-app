package com.pantry.service;

import com.pantry.model.Recipe;
import com.pantry.model.RecipeIngredient;
import com.pantry.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class RecipeService {
    
    private final RecipeRepository recipeRepository;
    private final IngredientService ingredientService;
    
    public RecipeService(RecipeRepository recipeRepository, IngredientService ingredientService) {
        this.recipeRepository = recipeRepository;
        this.ingredientService = ingredientService;
    }
    
    public List<Recipe> getAll() {
        return recipeRepository.findAll();
    }
    
    public Recipe getById(Long id) {
        return recipeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @Transactional
    public Recipe createRecipe(String name, java.util.List<java.util.Map<String, Object>> ingredientsList) {
        Recipe recipe = new Recipe(name);
        recipe = recipeRepository.save(recipe);
        if (ingredientsList != null) {
            for (java.util.Map<String, Object> ing : ingredientsList) {
                String ingredientName = (String) ing.get("ingredientName");
                Double quantity = ((Number) ing.get("quantity")).doubleValue();
                String unit = (String) ing.get("unit");
                recipe.getIngredients().add(new RecipeIngredient(recipe, ingredientName, quantity, unit));
            }
        }
        return recipeRepository.save(recipe);
    }

    @Transactional
    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    @Transactional
    public void executeRecipe(Long recipeId, java.util.List<RecipeIngredient> selectedIngredients) {
        for (RecipeIngredient ingredient : selectedIngredients) {
            ingredientService.subtractQuantity(
                ingredient.getIngredientName(),
                ingredient.getQuantity(),
                ingredient.getUnit()
            );
        }
    }
}
