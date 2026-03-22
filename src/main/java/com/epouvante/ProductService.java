package com.epouvante;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    // récupérer tous les produits
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    // récupérer un produit par id
    public Product getProductById(Long id) {
        Optional<Product> product = repository.findById(id);
        return product.orElse(null);
    }

    // ajouter un produit
    public Product addProduct(Product product) {
        return repository.save(product);
    }

    // modifier un produit
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> optionalProduct = repository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setCategory(productDetails.getCategory());
            return repository.save(product);
        }
        return null;
    }

    // supprimer un produit
    public boolean deleteProduct(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}