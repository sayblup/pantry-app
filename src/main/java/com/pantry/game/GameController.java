package com.pantry.game;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameEngine gameEngine;

    public GameController(GameEngine gameEngine) {
        this.gameEngine = gameEngine;
    }

    @PostMapping("/command")
    public Map<String, String> executeCommand(@RequestBody GameRequest request) {
        String output = gameEngine.processCommand(request.getSessionId(), request.getCommand());
        return Map.of("output", output);
    }
}

class GameRequest {
    private UUID sessionId;
    private String command;

    public UUID getSessionId() { return sessionId; }
    public void setSessionId(UUID sessionId) { this.sessionId = sessionId; }
    public String getCommand() { return command; }
    public void setCommand(String command) { this.command = command; }
}