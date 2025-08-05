/**
 * Game End Screen Component - Main Game Playing Interface
 *
 * This is the main screen players see during gameplay after all players
 * have seen their roles.
 *
 * ORIGINAL DESIGN: This preserves your exact original Code.org design including:
 * - Simple "Game Started!" title
 * - Locations section with click-to-speak functionality
 * - Helper questions section with green background
 * - Single "NEW GAME" button
 * - Your original layout and styling
 *
 * This screen is where the actual Spyfall game takes place - players
 * will ask questions, give answers, and try to figure out who the spy is.
 */

import React from "react";
import { generateLocationsString } from "../../utils/gameLogic";
import type { GameEndScreenProps } from "../../types";

/**
 * Game End Screen Component
 *
 * The main gameplay interface where players conduct their investigation.
 * Uses your original simple, focused design.
 *
 * @param props - Contains game state and event handlers
 */
const GameEndScreen: React.FC<GameEndScreenProps> = ({
  gameState,
  onNewGame,
  onSpeakLocations,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* === YOUR ORIGINAL TITLE === */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-6">
            🎯 Game Started!
          </h2>
        </div>

        {/* === LOCATIONS CARD === */}
        <div className="game-card">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            📍 Possible Locations
          </h3>
          <div
            className="bg-gray-50 rounded-lg p-4 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={onSpeakLocations}
            title={gameState.isCurrentlySpeaking ? "Click to mute" : "Click to hear locations read aloud"}
          >
            {/* Your original locations display format with bullet points */}
            <div className="whitespace-pre-line text-gray-700">
              {generateLocationsString(
                gameState.availableLocations,
                gameState.commonLocation || undefined
              ).split('\n').map((location, index) => 
                location.trim() ? `• ${location}` : ''
              ).filter(Boolean).join('\n')}
            </div>
            {/* Your original audio hint */}
            <div className="text-xs text-gray-500 mt-2">
              {gameState.isCurrentlySpeaking ? "🔇 Click to mute" : "🔊 Click to hear locations"}
            </div>
          </div>
        </div>

        {/* === QUESTION IDEAS CARD === */}
        <div className="game-card">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            💡 Question Ideas
          </h3>
          <div className="bg-green-50 rounded-lg p-4 text-sm">
            <div className="whitespace-pre-line text-gray-700">
              {gameState.helperQuestions.split('\n').map((question, index) => 
                question.trim() ? `• ${question.replace(/^\d+\.\s*/, '')}` : ''
              ).filter(Boolean).join('\n')}
            </div>
          </div>
        </div>

        {/* === NEW GAME BUTTON === */}
        <div className="game-card">
          <button onClick={onNewGame} className="game-button w-full">
            🏠 NEW GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEndScreen;
