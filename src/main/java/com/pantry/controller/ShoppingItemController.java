package com.pantry.controller;

import com.pantry.model.ShoppingItem;
import com.pantry.service.ShoppingItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shopping")
public class ShoppingItemController {

    private final ShoppingItemService shoppingItemService;

    public ShoppingItemController(ShoppingItemService shoppingItemService) {
        this.shoppingItemService = shoppingItemService;
    }

    @GetMapping
    public List<ShoppingItem> getAll() {
        return shoppingItemService.getAll();
    }

    @PostMapping
    public ResponseEntity<ShoppingItem> addItem(@RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        Double quantity = ((Number) request.get("quantity")).doubleValue();
        String unit = (String) request.get("unit");
        String category = (String) request.getOrDefault("category", "Inne");
        return ResponseEntity.ok(shoppingItemService.addItem(name, quantity, unit, category));
    }

    @PostMapping("/batch")
    public ResponseEntity<Void> addBatch(@RequestBody List<Map<String, Object>> items) {
        for (Map<String, Object> item : items) {
            String name = (String) item.get("name");
            Double quantity = ((Number) item.get("quantity")).doubleValue();
            String unit = (String) item.get("unit");
            String category = (String) item.getOrDefault("category", "Inne");
            shoppingItemService.addItem(name, quantity, unit, category);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/toggle")
    public ResponseEntity<ShoppingItem> toggle(@PathVariable Long id) {
        return ResponseEntity.ok(shoppingItemService.toggleChecked(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        shoppingItemService.deleteItem(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/move-to-pantry")
    public ResponseEntity<Void> moveCheckedToPantry() {
        shoppingItemService.moveCheckedToPantry();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/checked")
    public ResponseEntity<Void> deleteChecked() {
        shoppingItemService.deleteChecked();
        return ResponseEntity.ok().build();
    }
}
