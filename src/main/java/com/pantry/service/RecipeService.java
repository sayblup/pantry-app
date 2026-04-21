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
    public void executeRecipe(Long recipeId, List<RecipeIngredient> selectedIngredients) {
        for (RecipeIngredient ingredient : selectedIngredients) {
            ingredientService.subtractQuantity(
                ingredient.getIngredientName(),
                ingredient.getQuantity(),
                ingredient.getUnit()
            );
        }
    }
}
