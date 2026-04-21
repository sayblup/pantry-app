package com.pantry;

import com.pantry.model.*;
import com.pantry.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;
    
    public DataInitializer(IngredientRepository ingredientRepository,
                          RecipeRepository recipeRepository) {
        this.ingredientRepository = ingredientRepository;
        this.recipeRepository = recipeRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        if (ingredientRepository.count() == 0) {
            ingredientRepository.save(new Ingredient("Mąka", 1000.0, "g"));
            ingredientRepository.save(new Ingredient("Cukier", 500.0, "g"));
            ingredientRepository.save(new Ingredient("Mleko", 2.0, "l"));
            ingredientRepository.save(new Ingredient("Jaja", 10.0, "g"));
            ingredientRepository.save(new Ingredient("Masło", 250.0, "g"));
            ingredientRepository.save(new Ingredient("Sól", 500.0, "g"));
        }
        
        if (recipeRepository.count() == 0) {
            Recipe nalesniki = new Recipe("Naleśniki");
            nalesniki.getIngredients().add(new RecipeIngredient(nalesniki, "Mąka", 200.0, "g"));
            nalesniki.getIngredients().add(new RecipeIngredient(nalesniki, "Mleko", 0.5, "l"));
            nalesniki.getIngredients().add(new RecipeIngredient(nalesniki, "Jaja", 2.0, "g"));
            recipeRepository.save(nalesniki);
            
            Recipe ciasto = new Recipe("Ciasto kruche");
            ciasto.getIngredients().add(new RecipeIngredient(ciasto, "Mąka", 300.0, "g"));
            ciasto.getIngredients().add(new RecipeIngredient(ciasto, "Masło", 150.0, "g"));
            ciasto.getIngredients().add(new RecipeIngredient(ciasto, "Cukier", 100.0, "g"));
            recipeRepository.save(ciasto);

            Recipe schabowe = new Recipe("Kotlety Schabowe");
            schabowe.getIngredients().add(new RecipeIngredient(schabowe, "Schab wieprzowy", 500.0, "g"));
            schabowe.getIngredients().add(new RecipeIngredient(schabowe, "Jaja", 2.0, "g"));
            schabowe.getIngredients().add(new RecipeIngredient(schabowe, "Bułka tarta", 100.0, "g"));
            schabowe.getIngredients().add(new RecipeIngredient(schabowe, "Mąka", 50.0, "g"));
        }
    }
}
