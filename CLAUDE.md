# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a game engine for the classic board game Camelot, written in JavaScript using ES modules.

## Common Commands

### Development

- `npm test` - Runs linting, formatting checks, and all tests
- `npm run lint` - Run ESLint with zero warnings tolerance
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Check Prettier formatting
- `npm run format:fix` - Auto-fix formatting issues

### Running Individual Tests

- `NODE_OPTIONS=--experimental-vm-modules jest test/path/to/specific.test.js` - Run a specific test file
- `NODE_OPTIONS=--experimental-vm-modules jest --testNamePattern="test name"` - Run tests matching a pattern

## Architecture

### Module Structure

The codebase is organized into three main areas:

1. **Initialization (`lib/init/`)** - Functions for creating and setting up game state

   - `create-empty-game.js` - Creates a new game with empty board
   - `create-board-spaces.js` - Generates the board layout
   - `with-starting-pieces.js` - Places initial pieces on the board

2. **Query (`lib/query/`)** - Read-only functions for examining game state

   - `is-valid-move.js` - Complex validation logic for move legality
   - `get-game-winner.js` - Determines if a player has won
   - `get-board-space.js` - Retrieves board space information
   - All query functions are pure and do not modify state

3. **Update (`lib/update/`)** - Functions that create new game states
   - `apply-move.js` - Applies a single move between two spaces
   - `apply-moves.js` - Applies a sequence of moves (for multi-jump scenarios)
   - Updates return new game state objects (immutable approach)

### Key Patterns

- **Immutable State**: All update functions return new game state objects rather than modifying existing ones
- **Pure Functions**: Query functions have no side effects
- **ES Modules**: Uses ES module syntax (`import`/`export`) throughout
- **Function Style**: Multi-statement top-level functions use `function` declarations; single-expression functions and inline callbacks use arrow functions

### Game State Structure

The game state object contains:

- `boardSpaces` - Array of board space objects with row, col, and piece information
- `turnCount` - Number of turns played
- `capturedPieces` - Object tracking captured pieces by player and type

### Important Constants

Constants are defined in `lib/get-constants.js` including player names, piece types, board dimensions, and goal rows.

## Testing

- Tests mirror the source structure in the `test/` directory
- Jest is used as the test runner with experimental VM modules enabled
- Tests focus on game logic validation and state transitions

## Code Style

- ESLint extends `eslint-config-nth` with some rules disabled
- Prettier configured for single quotes and ES5 trailing commas
- Magic numbers should be extracted as named constants (see `no-magic-numbers` rule exceptions)
