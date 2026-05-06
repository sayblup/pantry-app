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
        if (unitRepository.count() == 0) {
            unitRepository.save(new Unit("g", 1.0, "g"));
            unitRepository.save(new Unit("kg", 1000.0, "g"));
            unitRepository.save(new Unit("ml", 1.0, "ml"));
            unitRepository.save(new Unit("l", 1000.0, "ml"));
            unitRepository.save(new Unit("szt", 1.0, "szt"));
        }
    }
    
    @Transactional
    public double convert(double quantity, String fromUnit, String toUnit) {
        if (fromUnit.equals(toUnit)) {
            return quantity;
        }
        
        Unit from = unitRepository.findByName(fromUnit).orElse(null);
        Unit to = unitRepository.findByName(toUnit).orElse(null);
        
        if (from == null || to == null) {
            return quantity;
        }
        
        if (!from.getBaseUnit().equals(to.getBaseUnit())) {
            return quantity;
        }
        
        double baseQuantity = quantity * from.getConversionFactor();
        return baseQuantity / to.getConversionFactor();
    }
}
