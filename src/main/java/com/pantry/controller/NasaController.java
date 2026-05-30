package com.pantry.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/nasa")
public class NasaController {

    @Value("${nasa.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/apod")
    public ResponseEntity<String> getApod() {
        String url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
        try {
            String result = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\": \"Błąd pobierania danych z NASA\"}");
        }
    }
}
