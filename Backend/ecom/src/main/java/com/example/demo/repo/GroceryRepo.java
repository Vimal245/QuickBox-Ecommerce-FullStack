package com.example.demo.repo;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Grocery;

public interface GroceryRepo extends MongoRepository<Grocery, String> {
    // You can add custom query methods here if needed
}