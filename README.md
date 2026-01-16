# USTP CI/CD Tetris

[![Build (push only)](https://github.com/JantasBantasMe/ustp-cicd-final/actions/workflows/build.yml/badge.svg?branch=main&event=push)](https://github.com/JantasBantasMe/ustp-cicd-final/actions/workflows/build.yml?query=branch%3Amain+event%3Apush)
[![Publish to GitHub Pages](https://github.com/JantasBantasMe/ustp-cicd-final/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/JantasBantasMe/ustp-cicd-final/actions/workflows/publish.yml)
[![Release on Tag](https://github.com/JantasBantasMe/ustp-cicd-final/actions/workflows/release-on-tag.yml/badge.svg)](https://github.com/JantasBantasMe/ustp-cicd-final/actions/workflows/release-on-tag.yml)

Ein Tetris-Spiel als Übungsprojekt für CI/CD-Workflows im Rahmen der USTP-Lehrveranstaltung.

## 🎮 Live Demo

Die Anwendung ist auf GitHub Pages verfügbar:

**[https://JantasBantasMe.github.io/ustp-cicd-final](https://JantasBantasMe.github.io/ustp-cicd-final)**

## 🚀 Lokale Entwicklung

### Voraussetzungen

- **Node.js** (Version 20.x oder höher)
- **npm** (wird mit Node.js installiert)
- **Git**

### Installation und Build

1. **Repository klonen:**
   ```bash
   git clone https://github.com/JantasBantasMe/ustp-cicd-final.git
   cd ustp-cicd-final
   ```

2. **Abhängigkeiten installieren:**
   ```bash
   npm ci
   ```

3. **Anwendung bauen:**
   ```bash
   npm run build
   ```
   
   Die Build-Ausgabe befindet sich im `dist/` Verzeichnis.

### Lokaler Development Server

Starte den Vite Development Server:

```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:5173` verfügbar.

### Tests ausführen

**Tests im Watch-Modus (während Entwicklung):**
```bash
npm test
```

**Tests einmalig mit Coverage:**
```bash
npm run test:run
```

Die Coverage-Berichte werden im `test-results/coverage/` Verzeichnis gespeichert.

### Preview der Production Build

Um die produktive Build lokal zu testen:

```bash
npm run preview
```

## 🏗️ CI/CD Workflows

Dieses Projekt nutzt GitHub Actions für automatisierte Builds, Tests und Deployments:

- **Build** - Baut und testet die Anwendung bei jedem Push und Pull Request
- **Publish to GitHub Pages** - Deployt automatisch nach erfolgreichem Build auf `main`
- **Release on Tag** - Erstellt GitHub Releases mit Build-Artefakten bei Version-Tags (`v*.*.*`)
- **Dependabot** - Hält npm-Abhängigkeiten und GitHub Actions automatisch aktuell

## 📦 Projekt-Stack

- **React** mit TypeScript
- **Vite** als Build-Tool
- **Vitest** für Unit-Tests
- **Tailwind CSS** für Styling
- **Radix UI** für UI-Komponenten

## 📝 Lizenz

Siehe [LICENSE](LICENSE) Datei für Details.
