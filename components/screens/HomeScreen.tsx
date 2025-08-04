/**
 * Home Screen Component - Main Menu for Spyfall Game
 *
 * This is the first screen players see when they load the game.
 * It allows players to:
 * - Enter the number of players (3-20)
 * - Start a new game
 * - Access the "How to Play" instructions
 * - Reset all locations (for fresh sessions)
 *
 * Originally this was part of a large component, but breaking it out
 * makes it easier to understand, test, and maintain.
 */

import React from "react";
import type { HomeScreenProps } from "../../types";

/**
 * Home Screen Component
 *
 * Renders the main menu interface where users set up a new game.
 * Includes input validation and error display.
 *
 * @param props - Contains game state and event handlers from parent
 */
const HomeScreen: React.FC<HomeScreenProps> = ({
  gameState,
  onScreenChange,
  onStartGame,
  onResetLocations,
  onPlayerInputChange,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-md w-full text-center">
        {/* === GAME TITLE === */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🕵️ SPYFALL</h1>
        <p className="text-gray-600 mb-8">
          The ultimate party game of deception!
        </p>

        <div className="space-y-4">
          {/* === PLAYER COUNT INPUT === */}
          <div>
            <label
              htmlFor="playerInput"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Number of Players:
            </label>
            <input
              id="playerInput"
              type="number"
              min="3" // Minimum players for a fun game
              max="20" // Reasonable maximum to prevent chaos
              value={gameState.playerInputValue}
              onChange={(e) => onPlayerInputChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 3-20 players"
            />

            {/* === ERROR MESSAGE DISPLAY === */}
            {/* Only show error message if one exists */}
            {gameState.errorMessage && (
              <p className="text-red-500 text-sm mt-2">
                {gameState.errorMessage}
              </p>
            )}
          </div>

          {/* === MAIN ACTION BUTTONS === */}
          {/* Start Game Button - Primary action */}
          <button onClick={onStartGame} className="game-button w-full">
            🎯 START GAME
          </button>

          {/* How to Play Button - Secondary action */}
          <button
            onClick={() => onScreenChange("howToPlay")}
            className="game-button-secondary w-full"
          >
            📖 HOW TO PLAY
          </button>

          {/* Reset Locations Button - Admin action */}
          <button
            onClick={onResetLocations}
            className="game-button-secondary w-full text-sm"
          >
            🔄 RESET ALL LOCATIONS
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
