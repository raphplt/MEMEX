# 🧠 MEMEX

> **Le TikTok de l'intelligence.**
> Une plateforme de micro-learning social qui transforme le doomscrolling en apprentissage actif via un flux infini de connaissances vérifiées.

![Status](https://img.shields.io/badge/Status-POC%20%2F%20Alpha-orange)
![Stack](https://img.shields.io/badge/Stack-Fullstack-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 À Propos

**MEMEX** est une application mobile visant à démocratiser l'excellence culturelle. Notre moteur ne maximise pas seulement l'engagement, mais **l'acquisition de connaissances**.

### Core Concept : Le "Smart Feed"

Le backend n'est pas un simple miroir de Wikipédia. C'est un **Hub de Connaissance** intelligent qui agrège, filtre et sert :

1.  **🔭 Découverte (70%)** : Articles Wikipédia enrichis et filtrés (Maths, Histoire, Tech).
2.  **🧠 Répétition (20%)** : Fiches déjà vues réapparaissant au moment critique (SRS - Spaced Repetition).
3.  **🎮 Challenge (10%)** : Quiz interactifs "Pop-up" intégrés au scroll.

---

## ⚙️ Architecture & Moteur d'Ingestion

Le projet repose sur un **Monorepo** (Turborepo) strict.

### Le "Quality Gate" (Ingestion Wikipédia)
Pour garantir une expérience type "TikTok", le backend (`apps/api`) ne sert pas le contenu brut de Wikipédia. Il utilise un **WikiIngestService** qui :
* Interroge l'API `fr.wikipedia.org` par lots.
* **Filtre drastiquement** : Rejette automatiquement tout article sans image haute résolution (`thumbnail`) ou avec un résumé trop court.
* **Smart Caching** : Stocke les articles valides en base de données locale (PostgreSQL) pour servir l'application instantanément sans latence API.

### 📂 Structure du Monorepo

```bash
.
├── apps
│   ├── mobile          # React Native (Expo SDK 50, Router v3)
│   └── api             # NestJS + TypeORM (Postgres)
│       └── src
│           ├── wiki    # Service d'ingestion & filtrage Wikipedia
│           ├── cards   # Gestion des fiches et du Feed
│           └── auth    # Authentification (Argon2 + JWT)
├── packages
│   ├── shared          # Interfaces TypeScript (ICard, DTOs) partagées
│   └── config          # ESLint & TSConfig partagés
└── turbo.json          # Pipeline de build & orchestration