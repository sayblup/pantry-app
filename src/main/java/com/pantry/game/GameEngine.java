package com.pantry.game;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameEngine {
    private final Map<UUID, PlayerState> sessions = new ConcurrentHashMap<>();

    public String processCommand(UUID sessionId, String input) {
        PlayerState state = sessions.computeIfAbsent(sessionId, PlayerState::new);

        if (state.gameEnded) {
            sessions.remove(sessionId);
            return "Gra zakończona. Odśwież okno (zamknij i otwórz ponownie terminal), aby zagrać od nowa.";
        }

        if (state.currentLocation.equals("START")) {
            return handleRecipeSelection(state, input);
        }

        GameCommand command = CommandParser.parse(input);
        String actionResult;

        if (command != null) {
            actionResult = command.execute(state, input.toLowerCase().trim());
        } else {
            actionResult = CommandParser.getIntelligentHint(input);
        }

        if (state.gameEnded) return actionResult; // Koniec gry

        return actionResult + generateStatusBlock(state);
    }

    private String handleRecipeSelection(PlayerState state, String input) {
        if (input.equals("start")) {
            return "Wracasz do domu po ciężkim dniu pracy. Włączasz aplikację 'Spiżarnia'.\n" +
                    "Wybierz przepis, na który masz ochotę:\n" +
                    "1. Naleśniki\n2. Omlet\n3. Muffiny\n\n(Wpisz 1, 2 lub 3)";
        }

        String choice = input.trim();
        if (choice.equals("1")) initRecipe(state, "Naleśniki", Arrays.asList("Olej", "Sól", "Cukier"));
        else if (choice.equals("2")) initRecipe(state, "Omlet", Arrays.asList("Masło", "Szczypiorek", "Pomidor"));
        else if (choice.equals("3")) initRecipe(state, "Muffiny", Arrays.asList("Proszek do pieczenia", "Czekolada", "Olej"));
        else return "Nieprawidłowy wybór. Wpisz 1, 2 lub 3.";

        state.currentLocation = "WEJSCIE";
        distributeItemsInStore(state);

        return "Wybrałeś: " + state.chosenRecipe.name + ".\n" +
                "Niestety, brakuje Ci: " + String.join(", ", state.chosenRecipe.missingIngredients) + ".\n" +
                "Musisz iść do sklepu!\n\n" +
                "--- Jesteś w głównym korytarzu sklepu. (Napisz 'pomoc' by zobaczyć komendy) ---" +
                generateStatusBlock(state);
    }

    private void initRecipe(PlayerState state, String name, List<String> missing) {
        state.chosenRecipe = new Recipe(name, missing);
    }

    private void distributeItemsInStore(PlayerState state) {
        Random rand = new Random();
        for (String itemStr : state.chosenRecipe.missingIngredients) {
            // Umieszczamy w losowych alejkach i regałach poza 11
            int aisleId = rand.nextInt(12) + 1;
            while(aisleId == 11) aisleId = rand.nextInt(12) + 1;

            Shelf shelf = rand.nextBoolean() ? state.storeMap.getAisle(aisleId).shelf1 : state.storeMap.getAisle(aisleId).shelf2;
            shelf.items.add(new Item(itemStr));
        }
    }

    private String generateStatusBlock(PlayerState state) {
        StringBuilder sb = new StringBuilder("\n\n=== STATUS ===\n");
        String locHuman = state.currentLocation
                .replace("WEJSCIE", "Wejście główne")
                .replace("KASA", "Kasa (wyjście)");

        if (locHuman.startsWith("ALEJKA_")) {
            int aId = Integer.parseInt(locHuman.split("_")[1]);
            locHuman = "Alejka: " + state.storeMap.getAisle(aId).name;
        } else if (locHuman.startsWith("REGAL_")) {
            String[] parts = state.currentLocation.split("_");
            locHuman = "Regał " + parts[2] + " w alejce " + state.storeMap.getAisle(Integer.parseInt(parts[1])).name;
        }

        sb.append("Lokalizacja: ").append(locHuman).append("\n");
        sb.append("Brakuje (z głównej listy): ").append(String.join(", ", state.chosenRecipe.missingIngredients)).append("\n");

        sb.append("Dostępne opcje ruchu:\n");
        if (state.currentLocation.equals("WEJSCIE")) {
            sb.append(" - idę do alejki [1-12]\n - podejdź do kasy\n - lista zakupów");
        } else if (state.currentLocation.startsWith("ALEJKA_")) {
            sb.append(" - idę do regału [1-2]\n - wróć");
        } else if (state.currentLocation.startsWith("REGAL_")) {
            sb.append(" - szukaj składników\n - wróć do alejki");
        } else if (state.currentLocation.equals("KASA")) {
            sb.append(" - zapłać\n - wróć");
        }

        return sb.toString();
    }
}