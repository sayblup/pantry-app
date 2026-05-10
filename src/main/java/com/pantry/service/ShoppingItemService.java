package com.pantry.service;

import com.pantry.model.ShoppingItem;
import com.pantry.repository.ShoppingItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ShoppingItemService {

    private final ShoppingItemRepository shoppingItemRepository;
    private final IngredientService ingredientService;

    public ShoppingItemService(ShoppingItemRepository shoppingItemRepository,
                               IngredientService ingredientService) {
        this.shoppingItemRepository = shoppingItemRepository;
        this.ingredientService = ingredientService;
    }

    public List<ShoppingItem> getAll() {
        return shoppingItemRepository.findAll();
    }

    @Transactional
    public ShoppingItem addItem(String name, Double quantity, String unit, String category) {
        ShoppingItem item = new ShoppingItem(name, quantity, unit, category);
        return shoppingItemRepository.save(item);
    }

    @Transactional
    public ShoppingItem toggleChecked(Long id) {
        ShoppingItem item = shoppingItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shopping item not found"));
        item.setChecked(!item.isChecked());
        return shoppingItemRepository.save(item);
    }

    @Transactional
    public void deleteItem(Long id) {
        shoppingItemRepository.deleteById(id);
    }

    @Transactional
    public void moveCheckedToPantry() {
        List<ShoppingItem> checked = shoppingItemRepository.findAll().stream()
                .filter(ShoppingItem::isChecked).toList();
        for (ShoppingItem item : checked) {
            ingredientService.addIngredient(item.getName(), item.getQuantity(), item.getUnit(), item.getCategory());
            shoppingItemRepository.delete(item);
        }
    }

    @Transactional
    public void deleteChecked() {
        List<ShoppingItem> checked = shoppingItemRepository.findAll().stream()
                .filter(ShoppingItem::isChecked).toList();
        shoppingItemRepository.deleteAll(checked);
    }
}
