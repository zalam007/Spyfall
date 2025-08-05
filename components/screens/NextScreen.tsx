/**
 * Next Screen Component - Player Transition Screen
 * 
 *        <button
          onClick={onStartPlayerReveal}
          className="game-button w-full mt-8"
        >
          {isFirstPlayer ? '👀 SEE MY LOCATION' : `👀 REVEAL PLAYER ${gameState.currentPlayerIndex + 1}`}
        </button>screen appears between players during the role reveal phase.
 * It serves as a privacy buffer, ensuring that the previous player's
 * information is not visible when the device is handed to the next player.
 * 
 * ORIGINAL DESIGN: This preserves your exact original Code.org design
 * including the different messages for first player, middle players, and final player.
 */

import React from "react";
import type { NextScreenProps } from "../../types";

/**
 * Next Screen Component
 *
 * Privacy transition screen that appears before each player sees their role.
 * Shows different messages based on whether it's the first, middle, or last player.
 *
 * @param props - Contains game state and event handlers
 */
const NextScreen: React.FC<NextScreenProps> = ({
  gameState,
  onStartPlayerReveal,
  getCurrentPlayerNumber,
}) => {
  // Calculate player position for conditional messaging
  const isFirstPlayer = gameState.currentPlayerIndex === 0;
  const isLastPlayer =
    gameState.currentPlayerIndex === gameState.playerInfo.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-md w-full text-center">
        {/* === ROTATING ICON === */}
        <div className="text-6xl mb-6">🔄</div>

        {/* === CONDITIONAL MESSAGING === */}
        {isFirstPlayer ? (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Ready to Start!
            </h2>
            <p className="text-gray-600">Player 1, you're up first!</p>
          </div>
        ) : !isLastPlayer ? (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Pass the Device!
            </h2>
            <p className="text-lg text-gray-600">
              Hand the device to Player {gameState.currentPlayerIndex + 1}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Final Player!</h2>
            <p className="text-lg text-gray-600">
              Hand the device to Player {gameState.currentPlayerIndex + 1} (the
              last player)
            </p>
          </div>
        )}

        {/* === REVEAL BUTTON === */}
        <button
          onClick={onStartPlayerReveal}
          className="game-button w-full mt-8"
        >
          {isFirstPlayer
            ? "👀 SEE MY LOCATION"
            : `👀 REVEAL PLAYER ${gameState.currentPlayerIndex + 1}`}
        </button>
      </div>
    </div>
  );
};

export default NextScreen;
