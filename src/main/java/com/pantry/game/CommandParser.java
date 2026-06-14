package com.pantry.game;

class CommandParser {
    public static GameCommand parse(String input) {
        String low = input.toLowerCase().trim();

        if (low.startsWith("idę") || low.startsWith("wróć")) return new MoveCommand();
        if (low.equals("szukaj składników")) return new SearchCommand();
        if (low.equals("ekwipunek") || low.equals("lista zakupów")) return new InventoryCommand();
        if (low.equals("podejdź do kasy") || low.equals("zapłać")) return new CheckoutCommand();
        if (low.equals("pomoc") || low.equals("mapa") || low.equals("rozejrzyj się")) return new HelpCommand();

        return null;
    }

    public static String getIntelligentHint(String input) {
        String low = input.toLowerCase().trim();
        if (low.startsWith("szuk")) return "Czy chodziło Ci o: szukaj składników?";
        if (low.startsWith("ekw") || low.startsWith("list")) return "Czy chodziło Ci o: ekwipunek / lista zakupów?";
        if (low.startsWith("pod") || low.startsWith("kas")) return "Czy chodziło Ci o: podejdź do kasy?";
        if (low.startsWith("id") && low.length() < 6) return "Czy chodziło Ci o: idę do alejki [X] / idę do regału [X]?";
        return "Nie rozumiem. Wpisz 'pomoc', aby uzyskać listę komend.";
    }
}