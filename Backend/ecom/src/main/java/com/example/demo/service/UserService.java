package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // In a real-world application, you should encrypt the password before saving it
        // Here, we're storing it as plain text for simplicity
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        // In a real-world application, you should verify the encrypted password
        return user.getPassword().equals(rawPassword);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
