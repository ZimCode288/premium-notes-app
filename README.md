# ✨ Premium Notes App

A sophisticated, minimalist note-taking application designed with a focus on premium aesthetics and developer experience. Built with Zero-Defect protocols, utilizing Vite, TypeScript, Vitest, and Playwright.

![Banner](https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200&h=400)

## 🎨 Design Philosophy
- **Anti-AI Design**: Eschewing generic UI frameworks for a custom-crafted, bespoke interface.
- **Premium Palette**: Deep Slates and Charcoal foundations with Vibrant Sky Blue accents.
- **Fluid Experience**: Smooth CSS-based micro-animations and Inter-based typography for maximum legibility and elegance.

## 🛠 Tech Stack
- **Core**: [Vite](https://vitejs.dev/) + [Vanilla TypeScript](https://www.typescriptlang.org/)
- **Logic Validation**: [Vitest](https://vitest.dev/)
- **End-to-End Testing**: [Playwright](https://playwright.dev/)
- **Persistence**: LocalStorage API
- **Styling**: Modern CSS3 with Flexbox/Grid and Custom Properties

## 🚀 Features
- **Instant CRUD**: Add and delete notes with a seamless, reactive interface.
- **Auto-Persistence**: Your thoughts are automatically saved to the browser's LocalStorage.
- **Bespoke UI**: Custom-designed components with hover effects and entry animations.
- **Type-Safe**: Fully implemented in TypeScript for robust reliability.

## 🧪 Quality Assurance
This project follows a strict **Zero-Defect** policy:
- **Unit Tests**: Logical operations are verified using Vitest.
- **E2E Tests**: Complete user flows (creation, deletion, interaction) are validated with Playwright.

### Running Tests
```bash
# Unit Tests
npm run test

# End-to-End Tests
npm run test:e2e
```

## 📂 Project Structure
```text
├── src/
│   ├── logic/          # Core business logic (Note CRUD)
│   ├── style.css       # Premium custom styling
│   ├── main.ts         # UI orchestration
│   └── logic/notes.ts  # Persistence logic
├── tests/
│   └── e2e/            # Playwright E2E test suites
└── vitest.config.ts    # Logic test configuration
```

## 📜 License
MIT
