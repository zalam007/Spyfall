# Spyfall Game - Code Organization Guide

This document explains the new, organized structure of the Spyfall game code. The code has been refactored from a single large component (originally converted from Code.org) into a clean, maintainable architecture.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main Next.js page (entry point)
│   ├── layout.tsx            # App layout and global styles
│   └── globals.css           # Global CSS styles
├── components/
│   ├── screens/              # Individual screen components
│   │   ├── HomeScreen.tsx           # Main menu
│   │   ├── HowToPlayScreen.tsx      # Game instructions
│   │   ├── NextScreen.tsx           # Player transition screen
│   │   ├── PlayerRevealScreen.tsx   # Location/role reveal
│   │   ├── GameEndScreen.tsx        # Main gameplay interface
│   │   └── index.ts                 # Export barrel for screens
│   ├── SpyfallGame.tsx       # Original monolithic component (legacy)
│   └── SpyfallGameNew.tsx    # New organized main component
├── hooks/
│   └── useSpyfallGame.ts     # Custom hook for game state management
├── types/
│   └── index.ts              # TypeScript type definitions
└── utils/
    ├── gameLogic.ts          # Core game logic functions
    └── soundEffects.ts       # Sound effect system
```

## 🏗️ Architecture Overview

### Before (Code.org conversion)
- ❌ One massive component with 440+ lines
- ❌ All state management mixed with UI logic
- ❌ Hard to test individual features
- ❌ Difficult to understand and modify
- ❌ Screen logic scattered throughout one file

### After (Organized structure)
- ✅ Separated into focused, single-responsibility components
- ✅ Custom hook manages all state logic
- ✅ Each screen is independently testable
- ✅ Clear data flow and separation of concerns
- ✅ Easy to understand and extend

## 🎯 Key Components Explained

### 1. `useSpyfallGame` Hook (`hooks/useSpyfallGame.ts`)
**Purpose**: Manages all game state and logic
**Responsibilities**:
- Game state management (players, locations, current screen)
- Game flow control (starting games, player transitions)
- Sound effect coordination
- Input validation and error handling

**Why it's useful**:
- Separates business logic from UI components
- Makes state management reusable and testable
- Provides a clean API for components to use

### 2. Screen Components (`components/screens/`)
Each screen is a focused component that handles one specific part of the game:

#### `HomeScreen.tsx`
- **Purpose**: Main menu and game setup
- **Features**: Player count input, validation, navigation to other screens
- **Props**: Game state, event handlers for starting games and navigation

#### `HowToPlayScreen.tsx`  
- **Purpose**: Game instructions for new players
- **Features**: Comprehensive rules, examples, strategy tips
- **Props**: Navigation handler to return to home

#### `NextScreen.tsx`
- **Purpose**: Privacy transition between players
- **Features**: Player number display, privacy instructions
- **Props**: Game state, player reveal trigger

#### `PlayerRevealScreen.tsx`
- **Purpose**: Shows each player their location and role
- **Features**: Different styling for spies vs. regular players, strategy tips
- **Props**: Current player info, next player navigation

#### `GameEndScreen.tsx`
- **Purpose**: Main gameplay interface
- **Features**: Location list, helper questions, text-to-speech, game controls
- **Props**: Game state, new game trigger, audio controls

### 3. Main Component (`SpyfallGameNew.tsx`)
**Purpose**: Screen router and prop coordinator
**Responsibilities**:
- Connects the game hook with screen components
- Routes between screens based on game state
- Passes appropriate props to each screen

### 4. Type Definitions (`types/index.ts`)
**Purpose**: Centralized TypeScript definitions
**Contents**:
- Game data types (Location, PlayerInfo)
- UI state types (GameScreen, GameState)
- Component prop interfaces
- Sound effect types

## 🔄 Data Flow

```
useSpyfallGame Hook
        ↓ (provides state & functions)
SpyfallGameNew Component  
        ↓ (passes relevant props)
Individual Screen Components
        ↓ (calls event handlers)
useSpyfallGame Hook (updates state)
```

## 🎵 Sound System

The sound system (`utils/soundEffects.ts`) provides:
- **Programmatic sound generation** using Web Audio API
- **Context-aware audio** (different sounds for different actions)
- **Browser compatibility** with graceful fallbacks
- **Volume management** to prevent audio overload

## 🎮 Game Flow

```
Home Screen → How to Play (optional) → Next Screen → Player Reveal → Game End
     ↑                                                                    ↓
     └────────────────── New Game ←──────────────────────────────────────┘
```

## 🔧 Adding New Features

### To add a new screen:
1. Create component in `components/screens/NewScreen.tsx`
2. Add screen type to `GameScreen` union in `types/index.ts`
3. Add props interface to `types/index.ts`
4. Export from `components/screens/index.ts`
5. Add routing logic to `SpyfallGameNew.tsx`
6. Add navigation logic to `useSpyfallGame.ts`

### To add new game logic:
1. Add pure functions to `utils/gameLogic.ts`
2. Add state/handlers to `useSpyfallGame.ts` hook
3. Pass handlers to relevant screen components
4. Update type definitions as needed

## 📝 Code Comments

Every file includes comprehensive comments explaining:
- **Purpose** of each component/function
- **Parameters** and return values
- **State management** patterns
- **Integration points** with other components
- **Original Code.org equivalents** where applicable

## 🧪 Testing Strategy

The new structure makes testing much easier:
- **Hooks** can be tested independently with React Testing Library
- **Screen components** can be tested with mock props
- **Utility functions** can be unit tested in isolation
- **Sound effects** can be mocked for consistent tests

## 🚀 Performance Benefits

- **Code splitting**: Each screen can be lazy-loaded if needed
- **Memory efficiency**: Clear component lifecycle management
- **Render optimization**: Components only re-render when their props change
- **Bundle size**: Better tree-shaking with separated modules

## 📖 Learning Resources

This structure follows React best practices including:
- **Custom Hooks**: [React Hooks Documentation](https://reactjs.org/docs/hooks-custom.html)
- **Component Composition**: [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
- **TypeScript**: [TypeScript React Guide](https://www.typescriptlang.org/docs/handbook/react.html)
- **Clean Architecture**: Separation of concerns and single responsibility principle
