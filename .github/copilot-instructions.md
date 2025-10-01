# Copilot Instructions for Simulador de Embarque

## Project Overview
This project automates the simulation of cargo shipments for planning in logistics and PCP. It is built with Node.js, Express.js, Electron.js, MongoDB, and a modular front-end (HTML/CSS/JS).

## Architecture & Key Components
- **Front-end UI**: Main logic in `TelaSimulador/simuladorDeEmbarque_7.0.2.js`, styles in `.css`, and UI in `.html`.
- **Unification Logic**: `TelaSimulador/unificacao.js` handles pallet unification (single/multiple).
- **Configuration**: `TelaConfig/Config.js` and related files manage default values and settings.
- **Server/API**: `server.js` exposes REST endpoints (GET, POST, PUT, DELETE) and connects to MongoDB.
- **Database**: Uses MongoDB for persistent product and simulation data.
- **Prisma**: Used for type-safe database access (see `generated/prisma/`).

## Developer Workflows
- **Start App**: `npm start` (runs Electron/Node server)
- **Build/Test**: No explicit build/test scripts; manual testing via UI and API endpoints.
- **Debug**: Use browser/Electron dev tools for front-end; Node.js debugging for server.
- **Database**: Update schema in `prisma/schema.prisma`, then run Prisma migration tools if needed.

## Project-Specific Patterns
- **Multiseleção de Pallets**: Select multiple pallets in UI, add products in batch. Selection state managed in JS, visualized with blue borders/shadows.
- **Unificação de Pallets**: Only eligible products (LM0008, LM0012) and empty, consecutive pairs (PP+PG) can be unified. Logic enforced in JS.
- **Default Values**: Product defaults are set per pallet type (PP/PG) via configuration page and auto-filled in UI.
- **Product Management**: Add/edit/delete/search products in UI; export list to Excel.
- **REST API**: All data operations (CRUD) go through Express endpoints in `server.js`.

## Integration Points
- **MongoDB**: Connection and queries in `server.js`.
- **Prisma**: Type definitions and client in `generated/prisma/`.
- **Electron**: Used for desktop app packaging and UI.
- **Axios**: For HTTP requests between front-end and server.

## Conventions & Rules
- **Unification**: Only empty, consecutive PP+PG pairs; only special products; max 3 products per pallet.
- **Product Families**: Only same-family products per pallet.
- **File Organization**: UI logic, styles, and markup are split by screen/module.
- **No automated tests**: Manual validation is required.

## Key Files & Directories
- `TelaSimulador/`: Main simulator logic and UI
- `TelaConfig/`: Configuration screen
- `server.js`: API and DB logic
- `generated/prisma/`: Prisma client and schema
- `prisma/schema.prisma`: DB schema

## Example: Multiseleção Pattern
```js
// TelaSimulador/simuladorDeEmbarque_7.0.2.js
function selecionarPallet(palletId) {
  // ...existing code...
  // Add palletId to selected list, update UI
}
```

## Example: Unificação Rule
```js
// TelaSimulador/unificacao.js
function unificarPallets(pair) {
  // ...existing code...
  // Only allow if both pallets are empty and eligible product
}
```

---
For questions about unclear rules or missing workflows, ask the user for clarification before making major changes.
