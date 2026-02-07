# Notes App

A clean, functional note-taking application focused on speed and simplicity.

## Features

- **CRUD Operations**: Create, read, update, and delete notes.
- **Persistence**: Automatic saving to browser LocalStorage.
- **Design**: Minimalist interface inspired by modern professional tools.
- **Quality**: Fully tested with Playwright for end-to-end reliability.

## Tech Stack

- **Frontend**: Vite, TypeScript, Vanilla CSS
- **Testing**: Playwright, Vitest
- **Storage**: LocalStorage API

## Development

### Setup

```bash
npm install
```

### Running the App

```bash
npm run dev
```

### Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

## Project Structure

- `src/logic/`: Core application logic and persistence.
- `src/main.ts`: UI rendering and event handling.
- `src/style.css`: Professional-Functional styling.
- `tests/e2e/`: Playwright end-to-end test suites.

## License

MIT
