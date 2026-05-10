package com.pantry.service;

import com.pantry.model.Unit;
import com.pantry.repository.UnitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;

@Service
public class UnitService {

    private final UnitRepository unitRepository;

    public UnitService(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @PostConstruct
    public void initUnits() {
        saveIfAbsent("g", 1.0, "g");
        saveIfAbsent("kg", 1000.0, "g");
        saveIfAbsent("ml", 1.0, "ml");
        saveIfAbsent("l", 1000.0, "ml");
        saveIfAbsent("szt", 1.0, "szt");
    }

    private void saveIfAbsent(String name, Double factor, String baseUnit) {
        if (unitRepository.findByName(name).isEmpty()) {
            unitRepository.save(new Unit(name, factor, baseUnit));
        }
    }

    @Transactional
    public double convert(double quantity, String fromUnit, String toUnit) {
        if (fromUnit.equals(toUnit)) return quantity;
        Unit from = unitRepository.findByName(fromUnit).orElse(null);
        Unit to = unitRepository.findByName(toUnit).orElse(null);
        if (from == null || to == null) return quantity;
        if (!from.getBaseUnit().equals(to.getBaseUnit())) return quantity;
        return (quantity * from.getConversionFactor()) / to.getConversionFactor();
    }
}
