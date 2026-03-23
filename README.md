# La Petite Maison de l Epouvante

Projet e-commerce fullstack avec frontend React/Vite et backend Spring Boot JWT.

## Stack

- Frontend : React, Vite, Zustand
- Backend : Spring Boot, Spring Security, JWT, JPA
- Base de donnees : PostgreSQL
- Conteneurisation : Docker, Docker Compose
- CI/CD : GitLab CI
- Qualite : SonarQube preconfigure

## Lancer en local

### Backend

Le backend attend PostgreSQL sur :

- host : `localhost`
- port : `5432`
- database : `epouvante`
- user : `postgres`
- password : `postgres`

Puis :

```bash
./gradlew bootRun
```

API disponible sur `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Application disponible sur `http://localhost:3000`

## Lancer avec Docker

```bash
docker compose up --build
```

Services :

- Frontend : `http://localhost:3000`
- Backend : `http://localhost:8080`
- PostgreSQL : `localhost:5432`

## Comptes par defaut

Admin cree automatiquement au demarrage du backend :

- email : `admin@epouvante.fr`
- mot de passe : `admin123`

## Variables backend

Le backend lit ces variables :

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`
- `SERVER_PORT`

## Pipeline GitLab

Le fichier [.gitlab-ci.yml](/c:/Users/Utilisateur/petite-maison-epouvante/petite-maison-epouvante/.gitlab-ci.yml) contient :

- test backend Gradle
- build frontend Vite
- analyse SonarQube si variables presentes
- build et push des images Docker vers GitLab Container Registry

### Variables GitLab a definir

Pour SonarQube :

- `SONAR_HOST_URL`
- `SONAR_TOKEN`

Pour le registry GitLab :

- `CI_REGISTRY`
- `CI_REGISTRY_USER`
- `CI_REGISTRY_PASSWORD`
- `CI_REGISTRY_IMAGE`

Les variables `CI_REGISTRY*` sont souvent fournies automatiquement par GitLab.

## Images Docker produites

La pipeline pousse :

- `backend:$CI_COMMIT_SHORT_SHA`
- `frontend:$CI_COMMIT_SHORT_SHA`

Et sur la branche `main` :

- `backend:latest`
- `frontend:latest`

## Tests

Backend :

```bash
./gradlew test
```

Frontend :

```bash
cd frontend
npm run build
```

## Suite recommandee

1. pousser le projet sur GitLab
2. activer la Container Registry
3. ajouter les variables Sonar si tu veux l analyse qualite
4. ajouter ensuite le deploiement cible : VM, Render, Railway, Kubernetes ou autre
