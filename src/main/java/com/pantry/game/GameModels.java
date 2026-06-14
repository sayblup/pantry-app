package com.pantry.game;

import java.util.*;

class Item {
    String name;
    public Item(String name) { this.name = name; }
}

class Recipe {
    String name;
    List<String> missingIngredients;
    public Recipe(String name, List<String> missing) {
        this.name = name;
        this.missingIngredients = missing;
    }
}

class Shelf {
    int id;
    List<Item> items = new ArrayList<>();
    public Shelf(int id) { this.id = id; }
}

class Aisle {
    int id;
    String name;
    Shelf shelf1 = new Shelf(1);
    Shelf shelf2 = new Shelf(2);
    public Aisle(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

class StoreMap {
    Map<Integer, Aisle> aisles = new HashMap<>();
    public StoreMap() {
        aisles.put(1, new Aisle(1, "Owoce i warzywa"));
        aisles.put(2, new Aisle(2, "Nabiał"));
        aisles.put(3, new Aisle(3, "Mięso i wędliny"));
        aisles.put(4, new Aisle(4, "Ryby i owoce morza"));
        aisles.put(5, new Aisle(5, "Mrożonki"));
        aisles.put(6, new Aisle(6, "Makarony i ryż"));
        aisles.put(7, new Aisle(7, "Przyprawy i dodatki"));
        aisles.put(8, new Aisle(8, "Słodycze i przekąski"));
        aisles.put(9, new Aisle(9, "Chemia gospodarcza"));
        aisles.put(10, new Aisle(10, "Artykuły dla zwierząt"));
        aisles.put(11, new Aisle(11, "Artykuły dziecięce"));
        aisles.put(12, new Aisle(12, "Piekarnia"));

        // Zawsze brudna pielucha w dziale dziecięcym, losowy regał
        aisles.get(11).shelf1.items.add(new Item("Brudna pielucha"));
    }
    public Aisle getAisle(int id) { return aisles.get(id); }
}

class PlayerState {
    UUID sessionId;
    Recipe chosenRecipe;
    String currentLocation = "START"; // START, WEJSCIE, ALEJKA_X, REGAL_X_Y, KASA
    List<String> inventory = new ArrayList<>();
    StoreMap storeMap = new StoreMap();
    boolean gameEnded = false;

    public PlayerState(UUID sessionId) { this.sessionId = sessionId; }
}