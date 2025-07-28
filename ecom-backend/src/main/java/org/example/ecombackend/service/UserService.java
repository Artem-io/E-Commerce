package org.example.ecombackend.service;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.Role;
import org.example.ecombackend.model.User;
import org.example.ecombackend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService
{
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {
        if (user.getRole() == null) user.setRole(Role.ROLE_USER);
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
}