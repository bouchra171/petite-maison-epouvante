# Petite Maison de l'Épouvante

Plateforme e-commerce de produits d'horreur développée avec Spring Boot.

## Architecture

- **Backend** : Spring Boot (Java 17)
- **Base de données** : H2 (développement) / PostgreSQL (production)
- **Sécurité** : Spring Security + JWT
- **Frontend** : À implémenter (Angular/React)

## Structure du projet

```
src/main/java/com/epouvante/
├── EpouvanteBackendApplication.java
├── AuthController.java          # Authentification (login/register)
├── ProductController.java       # CRUD produits
├── UserController.java          # Gestion utilisateurs (ADMIN)
├── ProductService.java          # Logique métier produits
├── UserService.java             # Logique métier utilisateurs
├── ProductRepository.java       # Accès données produits
├── UserRepository.java          # Accès données utilisateurs
├── Product.java                 # Entité produit
├── User.java                    # Entité utilisateur
├── Role.java                    # Enum rôles
├── SecurityConfig.java          # Configuration sécurité
├── JwtUtil.java                 # Utilitaires JWT
└── JwtAuthenticationFilter.java # Filtre JWT
```

## Démarrage

1. Cloner le repository
2. `./gradlew build`
3. `./gradlew bootRun`

L'application démarre sur `http://localhost:8080`

## API Endpoints

### Authentification

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Réponse :
```json
{
  "token": "jwt_token_here",
  "role": "USER"
}
```

### Produits

Utilisez le token JWT dans l'header : `Authorization: Bearer <token>`

#### Lister tous les produits
```bash
GET /api/products
Authorization: Bearer <token>
```

#### Obtenir un produit
```bash
GET /api/products/{id}
Authorization: Bearer <token>
```

#### Ajouter un produit (ADMIN)
```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Masque de clown",
  "description": "Masque effrayant",
  "price": 29.99,
  "category": "accessoires"
}
```

#### Modifier un produit (ADMIN)
```bash
PUT /api/products/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Masque de clown modifié",
  "description": "Masque très effrayant",
  "price": 34.99,
  "category": "accessoires"
}
```

#### Supprimer un produit (ADMIN)
```bash
DELETE /api/products/{id}
Authorization: Bearer <token>
```

### Utilisateurs (ADMIN seulement)

#### Lister tous les utilisateurs
```bash
GET /api/users
Authorization: Bearer <token>
```

#### Supprimer un utilisateur
```bash
DELETE /api/users/{id}
Authorization: Bearer <token>
```

## Rôles

- **USER** : Consultation produits, achat
- **ADMIN** : Gestion complète (CRUD produits, gestion utilisateurs)

## Base de données

### H2 (Développement)
- Console : `http://localhost:8080/h2-console`
- JDBC URL : `jdbc:h2:mem:testdb`
- Username : `sa`
- Password : (vide)

### PostgreSQL (Production)
Configurer dans `application.properties` :
```
spring.datasource.url=jdbc:postgresql://localhost:5432/epouvante
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## Tests

`./gradlew test`

## Technologies

- Spring Boot 4.0.3
- Spring Security
- JPA/Hibernate
- JWT
- H2/PostgreSQL
- Gradle

## Frontend

Un dossier `frontend/` a été créé pour accueillir l'application Angular/React. À implémenter selon les besoins.

### Structure proposée
- Catalogue produits
- Page produit détaillé
- Authentification (login/register)
- Dashboard admin
- Panier (bonus)

Utilisez les API backend documentées ci-dessus pour consommer les données.