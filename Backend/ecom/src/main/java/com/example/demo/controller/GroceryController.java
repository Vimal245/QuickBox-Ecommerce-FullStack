package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Grocery;
import com.example.demo.service.GroceryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/grocery")
@CrossOrigin
public class GroceryController {

    @Autowired
    private GroceryService groceryService;

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Grocery grocery) {
        Grocery savedProduct = groceryService.addProduct(grocery);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        Optional<Grocery> grocery = groceryService.getProductById(id);
        return grocery.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        List<Grocery> groceries = groceryService.getAllProducts();
        return ResponseEntity.ok(groceries);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Grocery grocery) {
        Optional<Grocery> updatedGrocery = groceryService.updateProduct(id, grocery);
        return updatedGrocery.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        groceryService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
