package com.example.demo.service;

import com.example.demo.model.Grocery;
import com.example.demo.repo.GroceryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroceryService {

    @Autowired
    private GroceryRepo groceryRepo;

    public Grocery addProduct(Grocery grocery) {
        return groceryRepo.save(grocery);
    }

    public Optional<Grocery> getProductById(String id) {
        return groceryRepo.findById(id);
    }

    public List<Grocery> getAllProducts() {
        return groceryRepo.findAll();
    }

    public Optional<Grocery> updateProduct(String id, Grocery grocery) {
        return groceryRepo.findById(id).map(existingGrocery -> {
            existingGrocery.setproduct_name(grocery.getproduct_name());
            existingGrocery.setPrice(grocery.getPrice());
            return groceryRepo.save(existingGrocery);
        });
    }

    public void deleteProduct(String id) {
        groceryRepo.deleteById(id);
    }
}
