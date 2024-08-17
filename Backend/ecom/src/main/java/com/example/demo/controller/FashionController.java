package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Fashion;
import com.example.demo.service.FashionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fashion")
@CrossOrigin
public class FashionController {

    @Autowired
    private FashionService fashionService;

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Fashion fashion) {
        Fashion savedProduct = fashionService.addProduct(fashion);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        Optional<Fashion> fashion = fashionService.getProductById(id);
        return fashion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        List<Fashion> fashions = fashionService.getAllProducts();
        return ResponseEntity.ok(fashions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        fashionService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}