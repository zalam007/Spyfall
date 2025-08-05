/**
 * Settings Screen Component - Game Settings and Preferences
 *
 * This screen allows players to configure game settings such as:
 * - Whether to remove locations after they're played
 * - Reset all locations to start fresh
 *
 * The settings are persisted in the game state and affect how
 * the game behaves during play.
 */

import React from 'react';
import type { SettingsScreenProps } from '../../types';

/**
 * Settings Screen Component
 * 
 * Provides controls for game settings and preferences.
 * Users can toggle settings and reset game data.
 * 
 * @param props - Contains game state and event handlers
 */
const SettingsScreen: React.FC<SettingsScreenProps> = ({
  gameState,
  onScreenChange,
  onResetAllLocations,
  onToggleRemoveLocationAfterPlay,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-md w-full">
        {/* === HEADER === */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ⚙️ Settings
        </h2>

        {/* === SETTINGS OPTIONS === */}
        <div className="space-y-6">
          
          {/* Remove Location After Play Setting */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Game Behavior
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gameState.removeLocationAfterPlay}
                  onChange={(e) => onToggleRemoveLocationAfterPlay(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Remove location after play
                  </div>
                  <div className="text-xs text-gray-500">
                    When enabled, played locations won't appear in future games
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Reset Locations Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Location Management
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-3">
                Reset all locations to start completely fresh. This brings back all previously played locations.
              </p>
              <button
                onClick={onResetAllLocations}
                className="game-button-secondary w-full"
              >
                🔄 Reset All Locations
              </button>
            </div>
          </div>
        </div>

        {/* === NAVIGATION === */}
        <div className="mt-8">
          <button
            onClick={() => onScreenChange('home')}
            className="game-button w-full"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
