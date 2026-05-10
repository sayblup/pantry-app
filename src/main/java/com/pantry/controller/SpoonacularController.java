package com.pantry.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/spoonacular")
public class SpoonacularController {

    @Value("${spoonacular.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/search")
    public ResponseEntity<String> search(@RequestParam String query) {
        String url = "https://api.spoonacular.com/recipes/complexSearch"
                + "?query=" + query
                + "&number=12"
                + "&addRecipeInformation=false"
                + "&apiKey=" + apiKey;
        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<String> getRecipe(@PathVariable int id) {
        String url = "https://api.spoonacular.com/recipes/" + id
                + "/information?includeNutrition=false&apiKey=" + apiKey;
        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }
}
