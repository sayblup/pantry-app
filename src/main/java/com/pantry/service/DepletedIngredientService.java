package com.pantry.service;

import com.pantry.model.DepletedIngredient;
import com.pantry.repository.DepletedIngredientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class DepletedIngredientService {
    
    private final DepletedIngredientRepository depletedRepository;
    
    public DepletedIngredientService(DepletedIngredientRepository depletedRepository) {
        this.depletedRepository = depletedRepository;
    }
    
    public List<DepletedIngredient> getAll() {
        return depletedRepository.findAll();
    }
    
    @Transactional
    public DepletedIngredient addDepleted(String name, String category) {
    DepletedIngredient depleted = new DepletedIngredient(name, category);
        return depletedRepository.save(depleted);
    }
    
    @Transactional
    public void removeDepleted(Long id) {
        depletedRepository.deleteById(id);
    }
}
