package com.pantry.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "calendar_entries")
public class CalendarEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate date;

    @Column(length = 1000)
    private String note;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = true)
    private Recipe recipe;

    public CalendarEntry() {}

    public CalendarEntry(LocalDate date, String note, Recipe recipe) {
        this.date = date;
        this.note = note;
        this.recipe = recipe;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public Recipe getRecipe() { return recipe; }
    public void setRecipe(Recipe recipe) { this.recipe = recipe; }
}
