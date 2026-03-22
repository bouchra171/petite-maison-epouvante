package com.epouvante;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userService.getUserByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User(registerRequest.getEmail(), registerRequest.getPassword(), Role.USER);
        userService.saveUser(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Optional<User> userOptional = userService.getUserByEmail(loginRequest.getEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", user.getRole().name());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
}

class LoginRequest {
    private String email;
    private String password;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class RegisterRequest {
    private String email;
    private String password;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}