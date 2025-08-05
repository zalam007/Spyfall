/**
 * Main Spyfall Game Component
 *
 * This is the main orchestrator component that manages the overall game flow.
 * It uses the custom useSpyfallGame hook for state management and renders
 * the appropriate screen component based on the current game state.
 *
 * ARCHITECTURE OVERVIEW:
 * =====================
 *
 * This component follows a clean separation of concerns:
 *
 * 1. STATE MANAGEMENT: All game logic is handled by the useSpyfallGame hook
 * 2. SCREEN RENDERING: Each game screen is a separate, focused component
 * 3. EVENT HANDLING: Events are passed down to child components via props
 * 4. DATA FLOW: Unidirectional data flow from hook → main component → screen components
 *
 * ORIGINAL CODE.ORG CONVERSION:
 * ============================
 *
 * Your original Code.org code had everything in one large function with global variables.
 * This new structure breaks that down into:
 *
 * - Hook: Manages state and game logic (useSpyfallGame)
 * - Main Component: Handles screen routing (this file)
 * - Screen Components: Handle specific UI for each game phase
 * - Utils: Pure functions for game logic and sound effects
 * - Types: TypeScript definitions for type safety
 *
 * This makes the code much more maintainable, testable, and easier to understand!
 */

"use client";

import React from "react";
import { useSpyfallGame } from "../hooks/useSpyfallGame";

// Import all screen components using the index file for cleaner imports
import {
  HomeScreen,
  HowToPlayScreen,
  SettingsScreen,
  NextScreen,
  PlayerRevealScreen,
  GameEndScreen,
} from "./screens";

/**
 * Main Spyfall Game Component
 *
 * This component acts as the "router" for the game, deciding which screen
 * to show based on the current game state. It connects the game logic hook
 * with the appropriate UI components.
 *
 * The component is much simpler than the original because all the complex
 * logic has been moved to the custom hook and individual screen components.
 */
const SpyfallGame: React.FC = () => {
  // ===== GAME STATE AND LOGIC =====
  // Get all game state and functions from our custom hook
  // This hook encapsulates all the complex state management that was
  // previously scattered throughout a large component
  const {
    // Game state
    gameState,

    // Navigation functions
    goToScreen,

    // Game setup functions
    handlePlayerInputChange,
    startGame,
    showError,

    // Player reveal functions
    startPlayerReveal,
    getCurrentPlayer,
    getCurrentPlayerNumber,
    goToNextPlayer,

    // Game management functions
    resetAllLocations,
    startNewGame,
    toggleRemoveLocationAfterPlay,
    toggleEveryoneSpyMode,
    addCustomLocation,
    removeCustomLocation,
    restorePlayedLocation,
    getCurrentAvailableLocations,
    getCurrentPlayedLocations,

    // Audio functions
    speakLocations,
  } = useSpyfallGame();

  // ===== SCREEN RENDERING =====
  /**
   * Render the appropriate screen based on current game state
   *
   * This replaces the large conditional rendering logic from the original
   * component with a clean, easy-to-understand screen routing system.
   *
   * Each screen is a separate component that receives only the props it needs,
   * making the code more modular and easier to test.
   */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* === HOME SCREEN === */}
      {/* Main menu where players enter the number of participants */}
      {gameState.currentScreen === "home" && (
        <HomeScreen
          gameState={gameState}
          onScreenChange={goToScreen}
          onStartGame={startGame}
          onPlayerInputChange={handlePlayerInputChange}
          onError={showError}
        />
      )}

      {/* === HOW TO PLAY SCREEN === */}
      {/* Instructions and rules for new players */}
      {gameState.currentScreen === "howToPlay" && (
        <HowToPlayScreen
          gameState={gameState}
          onScreenChange={goToScreen}
          onError={showError}
        />
      )}

      {/* === SETTINGS SCREEN === */}
      {/* Game settings and preferences */}
      {gameState.currentScreen === "settings" && (
        <SettingsScreen
          gameState={gameState}
          onScreenChange={goToScreen}
          onError={showError}
          onResetAllLocations={resetAllLocations}
          onToggleRemoveLocationAfterPlay={toggleRemoveLocationAfterPlay}
          onToggleEveryoneSpy={toggleEveryoneSpyMode}
          onAddLocation={addCustomLocation}
          onRemoveLocation={removeCustomLocation}
          onRestoreLocation={restorePlayedLocation}
          getAvailableLocations={getCurrentAvailableLocations}
          getPlayedLocations={getCurrentPlayedLocations}
        />
      )}

      {/* === NEXT SCREEN === */}
      {/* Privacy transition screen between players during role reveal */}
      {gameState.currentScreen === "nextScreen" && (
        <NextScreen
          gameState={gameState}
          onScreenChange={goToScreen}
          onStartPlayerReveal={startPlayerReveal}
          getCurrentPlayerNumber={getCurrentPlayerNumber}
          onError={showError}
        />
      )}

      {/* === PLAYER REVEAL SCREEN === */}
      {/* Shows each player their location and role */}
      {gameState.currentScreen === "playerReveal" && (
        <PlayerRevealScreen
          gameState={gameState}
          onScreenChange={goToScreen}
          onNextPlayer={goToNextPlayer}
          getCurrentPlayer={getCurrentPlayer}
          onError={showError}
        />
      )}

      {/* === GAME END SCREEN === */}
      {/* Main gameplay interface with locations and questions */}
      {gameState.currentScreen === "gameEnd" && (
        <GameEndScreen
          gameState={gameState}
          onScreenChange={goToScreen}
          onNewGame={startNewGame}
          onSpeakLocations={speakLocations}
          onError={showError}
        />
      )}
    </div>
  );
};

export default SpyfallGame;
