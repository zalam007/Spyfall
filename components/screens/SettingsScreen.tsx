/**
 * Settings Screen Component - Game Settings and Preferences
 *
 * This screen allows players to configure game settings such as:
 * - Whether to remove locations after they're played
 * - Everyone is spy mode toggle
 * - Add/remove/restore custom locations
 * - View played vs available locations
 * - Reset all locations to start fresh
 *
 * The settings are persisted in the game state and affect how
 * the game behaves during play.
 */

import React, { useState } from 'react';
import type { SettingsScreenProps } from '../../types';

/**
 * Settings Screen Component
 * 
 * Provides comprehensive controls for game settings and location management.
 * Users can toggle settings, manage locations, and reset game data.
 * 
 * @param props - Contains game state and event handlers
 */
const SettingsScreen: React.FC<SettingsScreenProps> = ({
  gameState,
  onScreenChange,
  onResetAllLocations,
  onToggleRemoveLocationAfterPlay,
  onToggleEveryoneSpy,
  onAddLocation,
  onRemoveLocation,
  onRestoreLocation,
  getAvailableLocations,
  getPlayedLocations,
}) => {
  const [newLocationName, setNewLocationName] = useState('');
  const [showAddLocation, setShowAddLocation] = useState(false);

  // Get current location lists
  const availableLocations = getAvailableLocations();
  const playedLocations = getPlayedLocations();

  const handleAddLocation = () => {
    if (newLocationName.trim()) {
      // For custom locations, we'll use a default set of roles
      const defaultRoles = ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5', 'Person 6', 'Person 7', 'Person 8'];
      onAddLocation(newLocationName.trim(), defaultRoles);
      setNewLocationName('');
      setShowAddLocation(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-2xl w-full">
        {/* === HEADER === */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ⚙️ Settings
        </h2>

        {/* === GAME SETTINGS === */}
        <div className="space-y-6">
          
          {/* Game Behavior Settings */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Game Behavior
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              
              {/* Remove Location After Play Setting */}
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

              {/* Everyone is Spy Mode Setting */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gameState.everyoneSpyEnabled}
                  onChange={(e) => onToggleEveryoneSpy(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Everyone is spy mode
                  </div>
                  <div className="text-xs text-gray-500">
                    Enable mode where everyone can be a spy (no common location)
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Location Management Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Location Management
            </h3>
            
            {/* Add New Location */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-800">Add Custom Location</h4>
                <button
                  onClick={() => setShowAddLocation(!showAddLocation)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showAddLocation ? 'Cancel' : '+ Add'}
                </button>
              </div>
              
              {showAddLocation && (
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    placeholder="Enter location name..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddLocation()}
                  />
                  <button
                    onClick={handleAddLocation}
                    disabled={!newLocationName.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Available Locations */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Available Locations ({availableLocations.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {availableLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded p-2 text-sm">
                    <span className="text-gray-800">{location}</span>
                    <button
                      onClick={() => onRemoveLocation(location)}
                      className="text-red-600 hover:text-red-800 ml-2"
                      title="Remove this location"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {availableLocations.length === 0 && (
                <p className="text-gray-500 text-sm italic">No available locations</p>
              )}
            </div>

            {/* Played Locations */}
            {playedLocations.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Played Locations ({playedLocations.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {playedLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded p-2 text-sm">
                      <span className="text-gray-600">{location}</span>
                      <button
                        onClick={() => onRestoreLocation(location)}
                        className="text-green-600 hover:text-green-800 ml-2"
                        title="Restore this location"
                      >
                        ↻
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset All Locations */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-3">
                Reset all locations to start completely fresh. This brings back all previously played locations and removes any custom locations.
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
