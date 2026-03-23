package com.epouvante;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public DataInitializer(
            ProductRepository productRepository,
            UserRepository userRepository,
            UserService userService
    ) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        seedProducts();
    }

    private void seedAdmin() {
        if (userRepository.findByEmail("admin@epouvante.fr").isPresent()) {
            return;
        }

        User admin = new User();
        admin.setEmail("admin@epouvante.fr");
        admin.setPassword("admin123");
        admin.setRole(Role.ADMIN);
        userService.saveUser(admin);
    }

    private void seedProducts() {
        if (productRepository.count() > 0) {
            return;
        }

        productRepository.saveAll(List.of(
                product(
                        "Bougie Citrouille Mystique",
                        "Bougie parfumee a la cannelle pour une ambiance Halloween chaleureuse.",
                        14.90,
                        "Decoration",
                        "https://images.unsplash.com/photo-1509557965875-b88c97052f0c?auto=format&fit=crop&w=900&q=80"
                ),
                product(
                        "Masque Spectre Blanc",
                        "Masque leger et inquietant, parfait pour completer un costume terrifiant.",
                        24.90,
                        "Costumes",
                        "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=900&q=80"
                ),
                product(
                        "Guirlande Lumieres Fantomes",
                        "Guirlande lumineuse decorative pour vitrine, salon ou soiree a theme.",
                        19.90,
                        "Lumieres",
                        "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=80"
                ),
                product(
                        "Chapeau de Sorciere Velours",
                        "Chapeau noir premium avec finition velours et silhouette elegante.",
                        17.50,
                        "Accessoires",
                        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
                ),
                product(
                        "Haut-Parleur Cris Nocturnes",
                        "Diffuse des ambiances sonores effrayantes pour maison hantee ou evenement.",
                        39.90,
                        "Sons",
                        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80"
                ),
                product(
                        "Centre de Table Corbeau Noir",
                        "Piece deco gothique pour table de fete, vitrine ou coin lecture sombre.",
                        29.90,
                        "Decoration",
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                )
        ));
    }

    private Product product(String name, String description, double price, String category, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        return product;
    }
}
