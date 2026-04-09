# 💸 Expense Tracker

Application web de gestion de dépenses personnelles, construite avec React et Node.js, entièrement conteneurisée avec Docker.

---

## 🛠️ Stack technique

| Couche           | Technologie                    |
|------------------|--------------------------------|
| Frontend         | React 19 + Vite + TypeScript   |
| Backend          | Node.js + Express + TypeScript |
| Conteneurisation | Docker + Docker Compose        |

---

## 🚀 Lancer le projet

### Prérequis

- [Docker](https://www.docker.com/) installé sur votre machine

### Démarrage

```bash
# Premier lancement
docker compose up --build

# Lancements suivants
docker compose up
```

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3001 |

---

## 📁 Structure du projet

```
expense-tracker/
├── expense_frontend/     # Application React + Vite
│   ├── src/
│   └── Dockerfile
├── expense_backend/      # API REST Express + TypeScript
│   ├── src/
│   └── Dockerfile
└── docker-compose.yml
```

---

## 📌 État du projet

🚧 En cours de développement