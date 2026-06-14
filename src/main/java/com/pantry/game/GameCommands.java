package com.pantry.game;

interface GameCommand {
    String execute(PlayerState state, String fullCommand);
}

class MoveCommand implements GameCommand {
    @Override
    public String execute(PlayerState state, String fullCommand) {
        String cmd = fullCommand.toLowerCase();

        if (cmd.equals("wróć") || cmd.equals("wróć do alejki")) {
            if (state.currentLocation.startsWith("REGAL_")) {
                state.currentLocation = "ALEJKA_" + state.currentLocation.split("_")[1];
                return "Wracasz do głównego przejścia alejki.";
            } else if (state.currentLocation.startsWith("ALEJKA_") || state.currentLocation.equals("KASA")) {
                state.currentLocation = "WEJSCIE";
                return "Wracasz do głównego korytarza sklepu.";
            }
            return "Nie masz z czego wracać.";
        }

        if (cmd.startsWith("idę do alejki ")) {
            if (!state.currentLocation.equals("WEJSCIE")) return "Musisz być w głównym korytarzu (WEJSCIE), by zmieniać alejki. Użyj 'wróć'.";
            try {
                int aisleNum = Integer.parseInt(cmd.replace("idę do alejki ", "").trim());
                if (aisleNum >= 1 && aisleNum <= 12) {
                    state.currentLocation = "ALEJKA_" + aisleNum;
                    return "Znajdujesz się w dziale: " + state.storeMap.getAisle(aisleNum).name + " (Alejka " + aisleNum + ").";
                }
            } catch (Exception e) {}
            return "Nie ma takiej alejki. Podaj numer od 1 do 12.";
        }

        if (cmd.startsWith("idę do regału ")) {
            if (!state.currentLocation.startsWith("ALEJKA_")) return "Musisz być w jakiejś alejce, aby podejść do regału.";
            String numStr = cmd.replace("idę do regału ", "").trim();
            if (numStr.equals("1") || numStr.equals("2")) {
                state.currentLocation = "REGAL_" + state.currentLocation.split("_")[1] + "_" + numStr;
                return "Stoisz przed regałem " + numStr + ". Przeszukaj go.";
            }
            return "W tej alejce są tylko regały 1 i 2.";
        }

        return "Nie rozumiem gdzie chcesz iść.";
    }
}

class SearchCommand implements GameCommand {
    @Override
    public String execute(PlayerState state, String fullCommand) {
        if (!state.currentLocation.startsWith("REGAL_")) {
            return "Nie ma tu czego szukać. Podejdź do jakiegoś regału (np. 'idę do regału 1').";
        }
        String[] parts = state.currentLocation.split("_");
        int aId = Integer.parseInt(parts[1]);
        int rId = Integer.parseInt(parts[2]);

        Shelf shelf = rId == 1 ? state.storeMap.getAisle(aId).shelf1 : state.storeMap.getAisle(aId).shelf2;
        if (shelf.items.isEmpty()) {
            return "Nie znalazłeś niczego potrzebnego.";
        }

        StringBuilder sb = new StringBuilder();
        for (Item item : shelf.items) {
            state.inventory.add(item.name);
            sb.append("Znalazłeś: ").append(item.name).append("!\n");
        }
        shelf.items.clear(); // Przedmiot podniesiony
        return sb.toString().trim();
    }
}

class InventoryCommand implements GameCommand {
    @Override
    public String execute(PlayerState state, String fullCommand) {
        return state.inventory.isEmpty() ? "Twój ekwipunek jest pusty." : "Twój ekwipunek: \n- " + String.join("\n- ", state.inventory);
    }
}

class CheckoutCommand implements GameCommand {
    @Override
    public String execute(PlayerState state, String fullCommand) {
        if (fullCommand.equals("podejdź do kasy")) {
            if (state.currentLocation.startsWith("REGAL_") || state.currentLocation.startsWith("ALEJKA_")) {
                return "Jesteś w głębi sklepu. Najpierw 'wróć' do wejścia.";
            }
            state.currentLocation = "KASA";
            return "Jesteś przy kasie. Wyłóż towar i 'zapłać'.";
        }

        if (fullCommand.equals("zapłać")) {
            if (!state.currentLocation.equals("KASA")) return "Nie stoisz przy kasie!";

            boolean hasAll = state.inventory.containsAll(state.chosenRecipe.missingIngredients);
            state.gameEnded = true;

            if (hasAll) {
                return "Gratulacje! Udało Ci się znaleźć wszystkie składniki i przygotować zakupy. Wracasz do domu gotować.";
            } else {
                return "Próbujesz zapłacić, ale przypominasz sobie, że nadal brakuje części produktów. Sklep zostaje zamknięty. Przegrywasz.";
            }
        }
        return "Nieprawidłowa komenda przy kasie.";
    }
}

class HelpCommand implements GameCommand {
    @Override
    public String execute(PlayerState state, String fullCommand) {
        return "Możliwe komendy:\n" +
                "- idę do alejki [1-12]\n" +
                "- idę do regału [1-2]\n" +
                "- wróć / wróć do alejki\n" +
                "- szukaj składników\n" +
                "- ekwipunek / lista zakupów\n" +
                "- podejdź do kasy\n" +
                "- zapłać";
    }
}