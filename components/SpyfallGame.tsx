'use client';

import React, { useState, useEffect } from 'react';
import { 
  assignPlayerLocationsAndRoles, 
  generateLocationsString, 
  generateRolesString, 
  generateHelperQuestions,
  speakText,
  stopSpeech,
  resetLocations,
  getAvailableLocations,
  LOCATIONS,
  type Location,
  type PlayerInfo 
} from '../utils/gameLogic';

// Define the different screens/states of the game
type GameScreen = 'home' | 'howToPlay' | 'setup' | 'nextScreen' | 'playerReveal' | 'gameEnd';

const SpyfallGame: React.FC = () => {
  // Game state variables (converted from your original global variables)
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('home');
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [commonLocation, setCommonLocation] = useState<Location | null>(null);
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [helperQuestions, setHelperQuestions] = useState<string>('');
  const [playerInputValue, setPlayerInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Initialize locations on first load
  useEffect(() => {
    resetLocations();
    console.log('🎲 Game initialized with all locations:', getAvailableLocations());
  }, []);

  // Sound effect function (simplified version of your playSound)
  const playClickSound = () => {
    // You can add actual sound files later or use Web Audio API
    console.log('🔊 Click sound played');
  };

  const playErrorSound = () => {
    console.log('❌ Error sound played');
  };

  const playSuccessSound = () => {
    console.log('✅ Success sound played');
  };

  // Screen navigation functions (converted from your onEvent functions)
  const goToScreen = (screen: GameScreen) => {
    playClickSound();
    setCurrentScreen(screen);
    setErrorMessage(''); // Clear any error messages when changing screens
  };

  // Start game function (converted from your startButton click event)
  const startGame = () => {
    const players = parseInt(playerInputValue);
    
    // Validate input (same validation as your original code)
    if (isNaN(players) || players <= 0) {
      setErrorMessage('Enter valid # of players');
      playErrorSound();
      return;
    }

    // Store number of players
    setNumPlayers(players);
    
    // Debug: Check available locations before assignment
    console.log('🎲 Available locations before game:', getAvailableLocations());
    
    // Assign locations and roles (using your original logic)
    const gameData = assignPlayerLocationsAndRoles(players);
    setPlayerInfo(gameData.playerInfo);
    setCommonLocation(gameData.commonLocation);
    setAvailableLocations(gameData.availableLocations);
    
    // Debug: Check what happened
    console.log('🎯 Selected location:', gameData.commonLocation.name);
    console.log('📍 Locations shown to players:', gameData.availableLocations.map(loc => loc.name));
    console.log('🎲 Available locations after game:', getAvailableLocations());
    
    // Reset player reveal index
    setCurrentPlayerIndex(0);
    
    // Move to intermediate screen first (like your original nextScreen)
    playSuccessSound();
    setCurrentScreen('nextScreen');
  };

  // Function to go from nextScreen to first player reveal
  const startPlayerReveals = () => {
    playClickSound();
    setCurrentScreen('playerReveal');
  };

  // Function to go back to nextScreen after viewing a role (and increment player)
  const goToNextScreen = () => {
    playClickSound();
    
    // Check if this was the last player
    if (currentPlayerIndex >= playerInfo.length - 1) {
      // All players have seen their roles, start the game!
      const questions = generateHelperQuestions();
      setHelperQuestions(questions);
      setCurrentScreen('gameEnd');
    } else {
      // Move to next player and go to intermediate screen
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setCurrentScreen('nextScreen');
    }
  };

  // This function is no longer needed since goToNextScreen handles everything
  const revealNextPlayer = () => {
    playClickSound();
    
    // If there are more players to reveal
    if (currentPlayerIndex < playerInfo.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setCurrentScreen('nextScreen'); // Go to intermediate screen between players
    } else {
      // All players revealed, generate helper questions and go to end screen
      const questions = generateHelperQuestions();
      setHelperQuestions(questions);
      setCurrentScreen('gameEnd');
    }
  };

  // Function to reset all locations (for completely fresh sessions)
  const resetAllLocations = () => {
    resetLocations();
    playClickSound();
    console.log('🔄 All locations reset for fresh session');
  };

  // Restart game function (converted from your homeButton click event)
  const restartGame = () => {
    stopSpeech();
    playClickSound();
    
    // DON'T reset locations - they should stay removed from previous games
    // Only reset the game state to go back to home screen
    
    // Reset all game state
    setCurrentScreen('home');
    setNumPlayers(0);
    setPlayerInfo([]);
    setCommonLocation(null);
    setAvailableLocations([]);
    setCurrentPlayerIndex(0);
    setHelperQuestions('');
    setPlayerInputValue('');
    setErrorMessage('');
  };

  // Speak locations function (converted from your text-to-speech functionality)
  const speakLocations = () => {
    stopSpeech();
    if (availableLocations.length > 0) {
      const locationsText = generateLocationsString(availableLocations, commonLocation || undefined);
      speakText(locationsText.replace(/\n/g, ', '), 'female', 'English');
    }
  };

  // Get current player info for display
  const getCurrentPlayer = () => {
    if (currentPlayerIndex < playerInfo.length) {
      return playerInfo[currentPlayerIndex];
    }
    return null;
  };

  // HOME SCREEN COMPONENT
  const HomeScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🕵️ SPYFALL</h1>
        <p className="text-gray-600 mb-8">The ultimate party game of deception!</p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="playerInput" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Players:
            </label>
            <input
              id="playerInput"
              type="number"
              min="3"
              max="20"
              value={playerInputValue}
              onChange={(e) => setPlayerInputValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 3-20 players"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          
          <button
            onClick={startGame}
            className="game-button w-full"
          >
            🎮 START GAME
          </button>
          
          <button
            onClick={() => goToScreen('howToPlay')}
            className="game-button-secondary w-full"
          >
            📖 HOW TO PLAY
          </button>
          
          <button
            onClick={resetAllLocations}
            className="game-button-secondary w-full text-sm"
          >
            🔄 RESET ALL LOCATIONS
          </button>
        </div>
      </div>
    </div>
  );

  // HOW TO PLAY SCREEN COMPONENT
  const HowToPlayScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📖 How to Play</h2>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-2">🎯 Objective</h3>
            <p>Everyone gets a location and role, except one person who is the SPY! The spy must figure out the location while everyone else tries to identify the spy.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">🎮 Setup</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Each player secretly views their role on this device</li>
              <li>Pass the device around so everyone can see their assignment</li>
              <li>The spy will see "SPY" instead of a location and role</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">🗣️ Gameplay</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Take turns asking each other questions about the location</li>
              <li>Try to be specific enough to catch the spy, but not so obvious that you give away the location</li>
              <li>The spy wins if they correctly guess the location</li>
              <li>Everyone else wins if they correctly identify the spy</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">💡 Tips</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use the helper questions for inspiration</li>
              <li>Pay attention to vague or suspicious answers</li>
              <li>Don't be too obvious about your role!</li>
            </ul>
          </div>
        </div>
        
        <button
          onClick={() => goToScreen('home')}
          className="game-button-secondary w-full mt-8"
        >
          ← BACK TO HOME
        </button>
      </div>
    </div>
  );

  // NEXT SCREEN COMPONENT - Intermediate screen to prevent players from seeing each other's roles
  const NextScreen = () => {
    const isFirstPlayer = currentPlayerIndex === 0;
    const isLastPlayer = currentPlayerIndex >= playerInfo.length - 1;
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="game-card max-w-md w-full text-center">
          <div className="text-6xl mb-6">🔄</div>
          
          {isFirstPlayer ? (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Ready to Start!</h2>
              <p className="text-gray-600">
                Player 1, you're up first!
              </p>
            </div>
          ) : !isLastPlayer ? (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Pass the Device!</h2>
              <p className="text-lg text-gray-600">
                Hand the device to Player {currentPlayerIndex + 1}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Final Player!</h2>
              <p className="text-lg text-gray-600">
                Hand the device to Player {currentPlayerIndex + 1} (the last player)
              </p>
            </div>
          )}
          
          <button
            onClick={startPlayerReveals}
            className="game-button w-full mt-8"
          >
            {isFirstPlayer ? '👀 SEE MY LOCATION' : `👀 REVEAL PLAYER ${currentPlayerIndex + 1}`}
          </button>
        </div>
      </div>
    );
  };

  // PLAYER REVEAL SCREEN COMPONENT
  const PlayerRevealScreen = () => {
    const currentPlayer = getCurrentPlayer();
    const isLastPlayer = currentPlayerIndex >= playerInfo.length - 1;
    
    if (!currentPlayer) return null;

    const isSpy = currentPlayer.location === 'spy';

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className={isSpy ? "spy-card max-w-md w-full text-center" : "game-card max-w-md w-full text-center"}>
          <h2 className="text-2xl font-bold mb-4">
            Player {currentPlayerIndex + 1} of {numPlayers}
          </h2>
          
          {isSpy ? (
            <div className="space-y-4">
              <div className="text-6xl mb-4">🕵️</div>
              <h3 className="text-3xl font-bold">YOU ARE THE SPY!</h3>
              <p className="text-lg">
                Your mission: Figure out the location without being discovered!
              </p>
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  💡 Listen carefully to others' answers and try to blend in!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl mb-4">🎭</div>
              <div className="space-y-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">LOCATION:</h3>
                  <p className="text-2xl font-bold text-blue-600">{currentPlayer.location}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">YOUR ROLE:</h3>
                  <p className="text-2xl font-bold text-green-600">{currentPlayer.role}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-600 text-center">
            Remember your location + role!
          </div>
          
          <button
            onClick={goToNextScreen}
            className="game-button w-full mt-4"
          >
            ✅ I'VE SEEN MY ROLE
          </button>
        </div>
      </div>
    );
  };

  // GAME END SCREEN COMPONENT
  const GameEndScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🎯 Game Started!</h2>
        
        {/* Locations List */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">📍 Possible Locations</h3>
          <div 
            className="bg-gray-50 rounded-lg p-4 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={speakLocations}
            title="Click to hear locations read aloud"
          >
            <div className="whitespace-pre-line text-gray-700">
              {generateLocationsString(availableLocations, commonLocation || undefined)}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              🔊 Click to hear locations
            </div>
          </div>
        </div>
        
        {/* Helper Questions */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">💡 Question Ideas</h3>
          <div className="bg-green-50 rounded-lg p-4 text-sm">
            <div className="whitespace-pre-line text-gray-700">
              {helperQuestions}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={restartGame}
            className="game-button flex-1"
          >
            🏠 NEW GAME
          </button>
        </div>
      </div>
    </div>
  );

  // MAIN RENDER - Show current screen based on state
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'howToPlay' && <HowToPlayScreen />}
      {currentScreen === 'nextScreen' && <NextScreen />}
      {currentScreen === 'playerReveal' && <PlayerRevealScreen />}
      {currentScreen === 'gameEnd' && <GameEndScreen />}
    </div>
  );
};

export default SpyfallGame;
