'use client';

import React, { useState, useEffect } from 'react';
import { 
  assignPlayerLocationsAndRoles, 
  generateLocationsString, 
  generateRolesString, 
  generateHelperQuestions,
  speakText,
  stopSpeech,
  LOCATIONS,
  type Location,
  type PlayerInfo 
} from '../utils/gameLogic';

// Define the different screens/states of the game
type GameScreen = 'home' | 'howToPlay' | 'setup' | 'playerReveal' | 'gameEnd';

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
    
    // Assign locations and roles (using your original logic)
    const gameData = assignPlayerLocationsAndRoles(players);
    setPlayerInfo(gameData.playerInfo);
    setCommonLocation(gameData.commonLocation);
    setAvailableLocations(gameData.availableLocations);
    
    // Reset player reveal index
    setCurrentPlayerIndex(0);
    
    // Move to player reveal screen
    playSuccessSound();
    setCurrentScreen('playerReveal');
  };

  // Reveal next player (converted from your nextButton click event)
  const revealNextPlayer = () => {
    playClickSound();
    
    // If there are more players to reveal
    if (currentPlayerIndex < playerInfo.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // All players revealed, generate helper questions and go to end screen
      const questions = generateHelperQuestions();
      setHelperQuestions(questions);
      setCurrentScreen('gameEnd');
    }
  };

  // Restart game function (converted from your homeButton click event)
  const restartGame = () => {
    stopSpeech();
    playClickSound();
    
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
      const locationsText = generateLocationsString(availableLocations);
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-700">
                  💡 Remember your role and try to catch the spy!
                </p>
              </div>
            </div>
          )}
          
          <button
            onClick={revealNextPlayer}
            className="game-button w-full mt-8"
          >
            {isLastPlayer ? '🎯 START PLAYING!' : '➡️ NEXT PLAYER'}
          </button>
          
          <div className="mt-4 text-sm text-gray-600">
            Pass the device to the next player before clicking!
          </div>
        </div>
      </div>
    );
  };

  // GAME END SCREEN COMPONENT
  const GameEndScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-card max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🎯 Game Started!</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Locations List */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">📍 Possible Locations</h3>
            <div 
              className="bg-gray-50 rounded-lg p-4 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={speakLocations}
              title="Click to hear locations read aloud"
            >
              <div className="whitespace-pre-line text-gray-700">
                {generateLocationsString(availableLocations)}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                🔊 Click to hear locations
              </div>
            </div>
          </div>
          
          {/* Roles for Current Location */}
          {commonLocation && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">🎭 Roles at {commonLocation.name}</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <div className="whitespace-pre-line text-gray-700">
                  {generateRolesString(commonLocation)}
                </div>
              </div>
            </div>
          )}
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
        
        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">
            Good luck! Remember: the spy wins if they guess the location correctly, 
            everyone else wins if they identify the spy! 🕵️
          </p>
        </div>
      </div>
    </div>
  );

  // MAIN RENDER - Show current screen based on state
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'howToPlay' && <HowToPlayScreen />}
      {currentScreen === 'playerReveal' && <PlayerRevealScreen />}
      {currentScreen === 'gameEnd' && <GameEndScreen />}
    </div>
  );
};

export default SpyfallGame;
