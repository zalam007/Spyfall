/**
 * Player Reveal Screen Component - Shows Location and Role
 *
 * This screen reveals each player's assigned location and role.
 *
 * ORIGINAL DESIGN: This preserves your exact original Code.org design including:
 * - Player number display (Player X of Y)
 * - Different card styling for spies (spy-card vs game-card)
 * - Your original spy message and styling
 * - Your original location/role display format
 *
 * The screen handles two different cases:
 * 1. Regular players: Shows their location and specific role
 * 2. Spy players: Shows spy message with different styling
 */

import React from "react";
import type { PlayerRevealScreenProps } from "../../types";

/**
 * Player Reveal Screen Component
 *
 * Shows the current player their location and role with your original styling.
 * Uses different card types (spy-card vs game-card) for visual distinction.
 *
 * @param props - Contains game state, current player info, and event handlers
 */
const PlayerRevealScreen: React.FC<PlayerRevealScreenProps> = ({
  gameState,
  onNextPlayer,
  getCurrentPlayer,
}) => {
  // Get the current player's information
  const currentPlayer = getCurrentPlayer();

  // If no current player (shouldn't happen, but good defensive programming)
  if (!currentPlayer) return null;

  // Check if current player is the spy
  const isSpy = currentPlayer.location === "spy";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* === CONDITIONAL CARD STYLING === */}
      {/* Your original design: spy-card for spies, game-card for regular players */}
      <div
        className={
          isSpy
            ? "spy-card max-w-md w-full text-center"
            : "game-card max-w-md w-full text-center"
        }
      >
        {/* === PLAYER NUMBER HEADER === */}
        {/* Your original player tracking display */}
        <h2 className="text-2xl font-bold mb-4">
          Player {gameState.currentPlayerIndex + 1} of {gameState.numPlayers}
        </h2>

        {/* === CONDITIONAL RENDERING BASED ON PLAYER TYPE === */}

        {/* SPY PLAYER DISPLAY - Your original spy design */}
        {isSpy ? (
          <div className="space-y-4">
            {/* Your original spy icon */}
            <div className="text-6xl mb-4">🕵️</div>

            {/* Your original spy announcement */}
            <h3 className="text-3xl font-bold text-red-600">YOU ARE THE SPY!</h3>
            <p className="text-lg text-red-700">
              Your mission: Figure out the location without being discovered!
            </p>

            {/* Your original spy tip box with original styling */}
            <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 mt-4">
              <p className="text-sm text-red-800">
                💡 Listen carefully to others' answers and try to blend in!
              </p>
            </div>
          </div>
        ) : (
          /* REGULAR PLAYER DISPLAY - Your original player design */
          <div className="space-y-4">
            {/* Your original player icon */}
            <div className="text-6xl mb-4">🎭</div>

            {/* Your original location and role layout */}
            <div className="space-y-2">
              {/* Location Display - Your original format and colors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-600">
                  LOCATION:
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {currentPlayer.location}
                </p>
              </div>

              {/* Role Display - Your original format and colors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-600">
                  YOUR ROLE:
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {currentPlayer.role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* === SHARED ELEMENTS FOR ALL PLAYERS === */}

        {/* Your original confirmation button */}
        <button onClick={onNextPlayer} className="game-button w-full mt-4">
          {isSpy ? "✅ I UNDERSTAND" : "✅ I'VE SEEN MY LOCATION"}
        </button>
      </div>
    </div>
  );
};

export default PlayerRevealScreen;
