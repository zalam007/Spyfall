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
import { playDiceRoll } from "../../utils/soundEffects";
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
  onGenerateNewQuestions,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-4">
        {/* === YOUR ORIGINAL TITLE === */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-3">
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
        <div className="game-card py-4">
          <h3 
            className="text-xl font-semibold mb-2 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors flex items-center"
            onClick={() => {
              playDiceRoll();
              onGenerateNewQuestions();
            }}
            title="Click to get new random questions"
          >
            🎲 Question Ideas
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <div className="text-gray-700 space-y-1">
              {gameState.helperQuestions.split('\n').map((question, index) => {
                const cleanQuestion = question.replace(/^\d+\.\s*/, '').trim();
                return cleanQuestion ? (
                  <div key={index} className="flex">
                    <span className="mr-2">•</span>
                    <span>{cleanQuestion}</span>
                  </div>
                ) : null;
              }).filter(Boolean)}
            </div>
          </div>
        </div>

        {/* === NEW GAME BUTTON === */}
        <button onClick={onNewGame} className="game-button w-full">
          🏠 NEW GAME
        </button>
      </div>
    </div>
  );
};

export default GameEndScreen;
