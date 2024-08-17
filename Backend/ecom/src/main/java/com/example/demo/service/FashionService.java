package com.example.demo.service;

import com.example.demo.model.Fashion;
import com.example.demo.repo.FashionRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FashionService {

    @Autowired
    private FashionRepo productRepository;

    public Fashion addProduct(Fashion fashion) {
        return productRepository.save(fashion);
    }

    public Optional<Fashion> getProductById(String id) {
        return productRepository.findById(id);
    }

    public List<Fashion> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}