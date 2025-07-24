package org.example.ecombackend.controller;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.ecombackend.model.User;
import org.example.ecombackend.security.JwtUtils;
import org.example.ecombackend.service.UserService;
import org.springframework.http.ResponseEntity;
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
    private final JwtUtils jwtUtils;

    @PostMapping("register")
    public User register(@RequestBody User user) {return userService.registerUser(user);}

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        user = (User) authentication.getPrincipal();

        if (!authentication.isAuthenticated()) return ResponseEntity.status(401).body("Invalid credentials");

        Cookie cookie = new Cookie("jwt", jwtUtils.generateToken(user));
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 12);
        cookie.setAttribute("SameSite", "Strict");
        response.addCookie(cookie);
        return ResponseEntity.ok("Login successful");
    }
}