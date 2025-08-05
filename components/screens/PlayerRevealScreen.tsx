/**
 * Player Reveal Screen Component - Shows Location and Role with Card Flip
 *
 * This screen reveals each player's assigned location and role.
 * Features a clickable card that flips to show all possible locations.
 *
 * FEATURES:
 * - Card flip animation with sound effects
 * - Front: Player's location and role (or spy status)
 * - Back: All possible locations in play
 * - Different card styling for spies (spy-card vs game-card)
 *
 * The screen handles two different cases:
 * 1. Regular players: Shows their location and specific role
 * 2. Spy players: Shows spy message with different styling
 */

import React, { useState } from "react";
import { generateLocationsString } from "../../utils/gameLogic";
import { playCardFlip } from "../../utils/soundEffects";
import type { PlayerRevealScreenProps } from "../../types";

/**
 * Player Reveal Screen Component
 *
 * Shows the current player their location and role with card flip functionality.
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
  
  // State for card flip animation
  const [isFlipped, setIsFlipped] = useState(false);

  // If no current player (shouldn't happen, but good defensive programming)
  if (!currentPlayer) return null;

  // Check if current player is the spy
  const isSpy = currentPlayer.location === "spy";

  // Handle card flip with sound effect
  const handleCardFlip = () => {
    playCardFlip();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* === CARD CONTAINER WITH FLIP ANIMATION === */}
      <div className="perspective-1000 max-w-md w-full">
        <div
          className={`card-flip-container ${isFlipped ? 'flipped' : ''} cursor-pointer`}
          onClick={handleCardFlip}
        >
          {/* === FRONT OF CARD (Player's Role) === */}
          <div className={`card-face card-front ${
            isSpy
              ? "spy-card text-center"
              : "game-card text-center"
          }`}>
            {/* === PLAYER NUMBER HEADER === */}
            <h2 className="text-2xl font-bold mb-4">
              Player {gameState.currentPlayerIndex + 1} of {gameState.numPlayers}
            </h2>

            {/* === CONDITIONAL RENDERING BASED ON PLAYER TYPE === */}

            {/* SPY PLAYER DISPLAY */}
            {isSpy ? (
              <div className="space-y-4">
                <div className="text-6xl mb-4">🕵️</div>
                <h3 className="text-3xl font-bold text-red-600">YOU ARE THE SPY!</h3>
                <p className="text-lg text-red-700">
                  Your mission: Figure out the location without being discovered!
                </p>
                <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 mt-4">
                  <p className="text-sm text-red-800">
                    💡 Listen carefully to others' answers and try to blend in!
                  </p>
                </div>
              </div>
            ) : (
              /* REGULAR PLAYER DISPLAY */
              <div className="space-y-4">
                <div className="text-6xl mb-4">🎭</div>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600">
                      LOCATION:
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {currentPlayer.location}
                    </p>
                  </div>
                  {gameState.rolesEnabled && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-600">
                        YOUR ROLE:
                      </h3>
                      <p className="text-2xl font-bold text-green-600">
                        {currentPlayer.role}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Spacer to push hint to bottom */}
            <div className="flex-1"></div>

            {/* Flip hint */}
            <p className="text-xs text-gray-500 mt-4">
              🔄 Click card to see possible locations
            </p>
          </div>

          {/* === BACK OF CARD (All Locations) === */}
          <div className="card-face card-back game-card text-center">
            <h2 className="text-xl font-bold mb-1 flex items-center justify-center gap-2">
              🗺️ Possible Locations
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-3 text-sm flex-1 overflow-y-auto space-y-3">
              {/* Locations */}
              <div>
                <div className="text-gray-700 text-left">
                  {generateLocationsString(
                    gameState.availableLocations,
                    gameState.commonLocation || undefined
                  ).split('\n').map((location, index) => {
                    if (!location.trim()) return null;
                    const cleanLocation = location.replace('• ', '');
                    const isCurrentLocation = !isSpy && cleanLocation === currentPlayer.location;
                    return (
                      <div 
                        key={index} 
                        className={isCurrentLocation ? 'text-green-600 font-semibold' : ''}
                      >
                        • {cleanLocation}
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
              </div>

              {/* Roles - only show for non-spy players and when roles are enabled */}
              {!isSpy && gameState.rolesEnabled && gameState.commonLocation && (
                <div className="border-t border-gray-300 pt-3">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Possible Roles at {gameState.commonLocation.name}:
                  </h3>
                  <div className="text-gray-700 text-left">
                    {gameState.commonLocation.roles.map((role, index) => {
                      const isCurrentRole = role === currentPlayer.role;
                      return (
                        <div 
                          key={index} 
                          className={isCurrentRole ? 'text-green-600 font-semibold' : ''}
                        >
                          • {role}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Flip hint */}
            <p className="text-xs text-gray-500 mt-1">
              🔄 Click card to go back to your role
            </p>
          </div>
        </div>
      </div>

      {/* === CONFIRMATION BUTTON (Outside the card) === */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button onClick={onNextPlayer} className="game-button px-12 py-3 whitespace-nowrap">
          {isSpy ? "✅ I UNDERSTAND" : "✅ I'VE SEEN MY LOCATION"}
        </button>
      </div>

      {/* === CSS STYLES FOR CARD FLIP ANIMATION === */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .card-flip-container {
          position: relative;
          width: 100%;
          height: 600px;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card-flip-container.flipped {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
          box-sizing: border-box;
        }

        .card-front {
          /* Front face is normal */
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card-flip-container:hover {
          transform: scale(1.02);
        }

        .card-flip-container.flipped:hover {
          transform: rotateY(180deg) scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default PlayerRevealScreen;
