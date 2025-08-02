/**
 * How to Play Screen Component - Game Instructions
 * 
 * This screen explains the rules and gameplay of Spyfall to new players.
 * 
 * ORIGINAL DESIGN: This preserves your exact original Code.org design including:
 * - Simple section-based layout (Objective, Setup, Gameplay, Tips)
 * - Your original wording and explanations
 * - "← BACK TO HOME" button with your original styling
 * - Clean, focused instruction format
 */

import React from 'react';
import type { BaseScreenProps } from '../../types';

/**
 * How to Play Screen Component
 * 
 * Displays your original game instructions in the same format and style.
 * Provides clear, concise rules that are easy to understand.
 * 
 * @param props - Contains navigation handler to return to home screen
 */
const HowToPlayScreen: React.FC<BaseScreenProps> = ({
  onScreenChange,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-2xl w-full">
        {/* === YOUR ORIGINAL TITLE === */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📖 How to Play</h2>
        
        {/* === YOUR ORIGINAL INSTRUCTION SECTIONS === */}
        <div className="space-y-4 text-gray-700">
          {/* Objective Section - Your original content */}
          <div>
            <h3 className="text-xl font-semibold mb-2">🎯 Objective</h3>
            <p>Everyone gets a location and role, except one person who is the SPY! The spy must figure out the location while everyone else tries to identify the spy.</p>
          </div>
          
          {/* Setup Section - Your original content */}
          <div>
            <h3 className="text-xl font-semibold mb-2">🎮 Setup</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Each player secretly views their role on this device</li>
              <li>Pass the device around so everyone can see their assignment</li>
              <li>The spy will see "SPY" instead of a location and role</li>
            </ul>
          </div>
          
          {/* Gameplay Section - Your original content */}
          <div>
            <h3 className="text-xl font-semibold mb-2">🗣️ Gameplay</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Take turns asking each other questions about the location</li>
              <li>Try to be specific enough to catch the spy, but not so obvious that you give away the location</li>
              <li>The spy wins if they correctly guess the location</li>
              <li>Everyone else wins if they correctly identify the spy</li>
            </ul>
          </div>
          
          {/* Tips Section - Your original content */}
          <div>
            <h3 className="text-xl font-semibold mb-2">💡 Tips</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use the helper questions for inspiration</li>
              <li>Pay attention to vague or suspicious answers</li>
              <li>Don't be too obvious about your role!</li>
            </ul>
          </div>
        </div>
        
        {/* === YOUR ORIGINAL BACK BUTTON === */}
        <button
          onClick={() => onScreenChange('home')}
          className="game-button-secondary w-full mt-8"
        >
          ← BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default HowToPlayScreen;
