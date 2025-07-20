package org.example.ecombackend.controller;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.User;
import org.example.ecombackend.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController { //TODO: refresh token
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("login")
    public String login(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        //This gets all info from db
        user = (User) authentication.getPrincipal();

        if (!authentication.isAuthenticated()) return "Failed";
        return "Welcome";
    }
}