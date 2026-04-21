package com.pantry.repository;

import com.pantry.model.DepletedIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepletedIngredientRepository extends JpaRepository<DepletedIngredient, Long> {
}
