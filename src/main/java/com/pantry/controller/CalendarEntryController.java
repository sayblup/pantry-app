package com.pantry.controller;

import com.pantry.model.CalendarEntry;
import com.pantry.model.Recipe;
import com.pantry.repository.CalendarEntryRepository;
import com.pantry.repository.RecipeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/calendar")
public class CalendarEntryController {

    private final CalendarEntryRepository calendarRepository;
    private final RecipeRepository recipeRepository;

    public CalendarEntryController(CalendarEntryRepository calendarRepository, RecipeRepository recipeRepository) {
        this.calendarRepository = calendarRepository;
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public List<CalendarEntry> getAllEntries() {
        return calendarRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<CalendarEntry> saveEntry(@RequestBody Map<String, Object> request) {
        LocalDate date = LocalDate.parse((String) request.get("date"));
        String note = (String) request.get("note");
        Long recipeId = request.get("recipeId") != null ? Long.valueOf(request.get("recipeId").toString()) : null;

        Recipe recipe = null;
        if (recipeId != null) {
            recipe = recipeRepository.findById(recipeId).orElse(null);
        }

        Optional<CalendarEntry> existing = calendarRepository.findByDate(date);
        CalendarEntry entry;

        if (existing.isPresent()) {
            entry = existing.get();
            entry.setNote(note);
            entry.setRecipe(recipe);
        } else {
            entry = new CalendarEntry(date, note, recipe);
        }

        // Jeśli wyczyszczono notatkę i przepis, usuwamy wpis z bazy, aby nie śmiecić
        if ((note == null || note.trim().isEmpty()) && recipe == null) {
            if (existing.isPresent()) {
                calendarRepository.delete(entry);
            }
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.ok(calendarRepository.save(entry));
    }
}
