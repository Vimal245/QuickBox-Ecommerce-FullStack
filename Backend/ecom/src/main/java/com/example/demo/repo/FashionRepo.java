package com.example.demo.repo;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Fashion;

public interface FashionRepo extends MongoRepository<Fashion, String> {
    // You can add custom query methods here if needed
}