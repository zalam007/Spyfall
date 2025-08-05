/**
 * Custom React Hook for Managing Spyfall Game State
 * 
 * This hook encapsulates all the game logic and state management for the Spyfall game.
 * It provides a clean interface for components to interact with the game state
 * without having to manage complex state logic themselves.
 * 
 * Originally, all this logic was in one large component (converted from Code.org).
 * By extracting it into a hook, we separate concerns and make the code more testable.
 */

import { useState, useEffect } from 'react';
import {
  assignPlayerLocationsAndRoles,
  generateHelperQuestions,
  resetLocations,
  getAvailableLocations,
  getPlayedLocations,
  getAllLocations,
  isEveryoneSpyEnabled,
  toggleEveryoneSpy,
  addLocation,
  removeLocation,
  restoreLocation,
  speakText,
  stopSpeech,
  generateLocationsString
} from '../utils/gameLogic';
import {
  playMenuClick,
  playStartGame,
  playNewGame,
  playSeeLocation,
  playSeenRole,
  playResetLocations,
  playError
} from '../utils/soundEffects';
import type { GameState, GameScreen, PlayerInfo, Location } from '../types';

/**
 * Custom hook that manages all Spyfall game state and logic
 * 
 * This hook handles:
 * - Game state management (players, locations, current screen)
 * - Game flow (starting games, moving between players, ending games)
 * - Sound effects for user interactions
 * - Error handling and validation
 * 
 * @returns Object with game state and all necessary functions to control the game
 */
export function useSpyfallGame() {
  // ===== GAME STATE =====
  // All the data needed to track the current state of the game
  const [gameState, setGameState] = useState<GameState>({
    // UI State - tracks which screen is currently shown
    currentScreen: 'home',
    isCurrentlySpeaking: false,
    
    // Game Settings - user preferences
    removeLocationAfterPlay: true, // Default to removing locations after play
    everyoneSpyEnabled: true, // Default to enabling "Everyone is spy" mode
    rolesEnabled: true, // Default to showing roles in the game
    
    // Game Setup - configuration for the current game
    numPlayers: 0,
    playerInputValue: '',
    errorMessage: '',
    
    // Game Data - the actual game information
    playerInfo: [],
    commonLocation: null,
    availableLocations: [],
    helperQuestions: '',
    
    // Player Tracking - which player is currently viewing their role
    currentPlayerIndex: 0,
  });

  // ===== INITIALIZATION =====
  /**
   * Initialize the game when the component first loads
   * This sets up the location pool for the session
   */
  useEffect(() => {
    resetLocations(); // Reset the global location pool
    console.log('🎲 Game initialized with all locations:', getAvailableLocations());
  }, []);

  // ===== NAVIGATION FUNCTIONS =====
  /**
   * Navigate to a different screen with sound feedback
   * Also clears any error messages when changing screens
   * 
   * @param screen - The screen to navigate to
   */
  const goToScreen = (screen: GameScreen) => {
    playMenuClick(); // Play sound feedback for navigation
    setGameState(prev => ({
      ...prev,
      currentScreen: screen,
      errorMessage: '' // Clear errors when navigating
    }));
  };

  // ===== GAME SETUP FUNCTIONS =====
  /**
   * Handle changes to the player count input field
   * 
   * @param value - The new input value (as string from input field)
   */
  const handlePlayerInputChange = (value: string) => {
    setGameState(prev => ({
      ...prev,
      playerInputValue: value,
      errorMessage: '' // Clear error when user starts typing
    }));
  };

  /**
   * Show an error message to the user
   * 
   * @param message - The error message to display
   */
  const showError = (message: string) => {
    playError(); // Play error sound
    setGameState(prev => ({
      ...prev,
      errorMessage: message
    }));
  };

  /**
   * Start a new game with the specified number of players
   * 
   * This function:
   * 1. Validates the player count input
   * 2. Assigns locations and roles to all players
   * 3. Sets up the game state for player reveals
   * 4. Navigates to the first transition screen
   */
  const startGame = () => {
    const players = parseInt(gameState.playerInputValue);
    
    // === INPUT VALIDATION ===
    // Same validation as the original Code.org version
    if (isNaN(players) || players <= 0) {
      showError('Enter valid # of players');
      return;
    }

    // Optional: Add reasonable limits (original Code.org didn't have these)
    if (players < 3) {
      showError('Need at least 3 players');
      return;
    }
    if (players > 20) {
      showError('Maximum 20 players');
      return;
    }

    // === GAME SETUP ===
    // Use the original game logic to assign locations and roles
    console.log('🎲 Available locations before game:', getAvailableLocations());
    
    const gameData = assignPlayerLocationsAndRoles(players, gameState.removeLocationAfterPlay);
    
    // Debug logging (matches original Code.org debugging)
    console.log('🎯 Selected location:', gameData.commonLocation.name);
    console.log('📍 Locations shown to players:', gameData.availableLocations.map(loc => loc.name));
    console.log('🎲 Available locations after game:', getAvailableLocations());
    
    // === UPDATE GAME STATE ===
    setGameState(prev => ({
      ...prev,
      numPlayers: players,
      playerInfo: gameData.playerInfo,
      commonLocation: gameData.commonLocation,
      availableLocations: gameData.availableLocations,
      currentPlayerIndex: 0, // Start with first player
      currentScreen: 'nextScreen', // Go to transition screen
      errorMessage: '' // Clear any previous errors
    }));

    // Play success sound and move to game
    playStartGame();
  };

  // ===== PLAYER REVEAL FUNCTIONS =====
  /**
   * Move from transition screen to player reveal screen
   * This is called when a player clicks "See My Location"
   */
  const startPlayerReveal = () => {
    playSeeLocation(); // Play reveal sound effect
    setGameState(prev => ({
      ...prev,
      currentScreen: 'playerReveal'
    }));
  };

  /**
   * Get the current player's information
   * 
   * @returns PlayerInfo object for current player, or null if invalid index
   */
  const getCurrentPlayer = (): PlayerInfo | null => {
    if (gameState.currentPlayerIndex < gameState.playerInfo.length) {
      return gameState.playerInfo[gameState.currentPlayerIndex];
    }
    return null;
  };

  /**
   * Get the current player number for display (1-based instead of 0-based)
   * 
   * @returns Current player number (1, 2, 3, etc.)
   */
  const getCurrentPlayerNumber = (): number => {
    return gameState.currentPlayerIndex + 1;
  };

  /**
   * Move to the next player or end the game
   * 
   * This function is called when a player clicks "I've Seen My Role".
   * It either moves to the next player or starts the main game if all players are done.
   */
  const goToNextPlayer = () => {
    playSeenRole(); // Play confirmation sound
    
    // Check if this was the last player
    if (gameState.currentPlayerIndex >= gameState.playerInfo.length - 1) {
      // === ALL PLAYERS DONE - START MAIN GAME ===
      // Generate helper questions for the game
      const questions = generateHelperQuestions();
      
      setGameState(prev => ({
        ...prev,
        helperQuestions: questions,
        currentScreen: 'gameEnd' // Move to main game screen
      }));
    } else {
      // === MORE PLAYERS TO REVEAL ===
      // Move to next player and go back to transition screen
      setGameState(prev => ({
        ...prev,
        currentPlayerIndex: prev.currentPlayerIndex + 1,
        currentScreen: 'nextScreen'
      }));
    }
  };

  // ===== GAME MANAGEMENT FUNCTIONS =====
  /**
   * Toggle the "remove location after play" setting
   * 
   * @param enabled - Whether to remove locations after they're played
   */
  const toggleRemoveLocationAfterPlay = (enabled: boolean) => {
    setGameState(prev => ({
      ...prev,
      removeLocationAfterPlay: enabled
    }));
  };

  /**
   * Toggle the "everyone is spy" setting
   * 
   * @param enabled - Whether to enable "Everyone is spy" mode
   */
  const toggleEveryoneSpyMode = (enabled: boolean) => {
    toggleEveryoneSpy(enabled);
    setGameState(prev => ({
      ...prev,
      everyoneSpyEnabled: enabled
    }));
  };

  /**
   * Toggle the roles display setting
   * 
   * @param enabled - Whether to show roles in the game
   */
  const toggleRolesMode = (enabled: boolean) => {
    setGameState(prev => ({
      ...prev,
      rolesEnabled: enabled
    }));
  };

  /**
   * Add a custom location
   * 
   * @param name - Name of the location
   * @param roles - Array of roles for this location
   * @returns Whether the location was successfully added
   */
  const addCustomLocation = (name: string, roles: string[]): boolean => {
    return addLocation(name, roles);
  };

  /**
   * Remove a location from available locations
   * 
   * @param name - Name of the location to remove
   */
  const removeCustomLocation = (name: string) => {
    removeLocation(name);
  };

  /**
   * Restore a played location back to available
   * 
   * @param name - Name of the location to restore
   */
  const restorePlayedLocation = (name: string) => {
    restoreLocation(name);
  };

  /**
   * Get current available locations
   */
  const getCurrentAvailableLocations = (): string[] => {
    return getAvailableLocations();
  };

  /**
   * Get played locations (unavailable)
   */
  const getCurrentPlayedLocations = (): string[] => {
    return getPlayedLocations();
  };

  /**
   * Reset all locations back to the original set
   * 
   * This is for completely fresh sessions where you want to play
   * with all locations available again.
   */
  const resetAllLocations = () => {
    resetLocations(); // Reset the global location pool
    playResetLocations(); // Play reset sound effect
    console.log('🔄 All locations reset for fresh session');
  };

  /**
   * Start a completely new game
   * 
   * This resets the game state back to the home screen but does NOT
   * reset the location pool (locations used in previous games stay removed).
   * This matches the original Code.org behavior.
   * 
   * NOTE: User settings (like removeLocationAfterPlay) are preserved.
   */
  const startNewGame = () => {
    stopSpeech(); // Stop any currently playing speech
    playNewGame(); // Play new game sound
    
    // Reset game state but preserve user settings
    setGameState(prev => ({
      currentScreen: 'home',
      isCurrentlySpeaking: false,
      removeLocationAfterPlay: prev.removeLocationAfterPlay, // Preserve user setting
      everyoneSpyEnabled: prev.everyoneSpyEnabled, // Preserve user setting
      rolesEnabled: prev.rolesEnabled, // Preserve user setting
      numPlayers: 0,
      playerInputValue: '',
      errorMessage: '',
      playerInfo: [],
      commonLocation: null,
      availableLocations: [],
      helperQuestions: '',
      currentPlayerIndex: 0,
    }));
  };

  // ===== TEXT-TO-SPEECH FUNCTIONS =====
  /**
   * Speak the list of available locations aloud
   * 
   * This uses the Web Speech API to read the locations to players.
   * Useful during the main game when players need to hear all possible locations.
   * Can be toggled on/off - if currently speaking, it will stop; if not speaking, it will start.
   */
  const speakLocations = () => {
    if (gameState.isCurrentlySpeaking) {
      // If currently speaking, stop the speech
      stopSpeech();
      setGameState(prev => ({ ...prev, isCurrentlySpeaking: false }));
    } else {
      // If not speaking, start speaking
      stopSpeech(); // Ensure any previous speech is stopped
      
      if (gameState.availableLocations.length > 0) {
        // Generate the locations string and convert to speech-friendly format
        const locationsText = generateLocationsString(
          gameState.availableLocations, 
          gameState.commonLocation || undefined
        );
        
        // Replace newlines with commas for better speech flow
        const speechText = locationsText.replace(/\n/g, ', ');
        
        // Set speaking state
        setGameState(prev => ({ ...prev, isCurrentlySpeaking: true }));
        
        // Create utterance with event handlers
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(speechText);
          utterance.rate = 1;
          utterance.pitch = 1;
          utterance.volume = 1;
          
          // Set up event handlers
          utterance.onend = () => {
            setGameState(prev => ({ ...prev, isCurrentlySpeaking: false }));
          };
          utterance.onerror = () => {
            setGameState(prev => ({ ...prev, isCurrentlySpeaking: false }));
          };
          
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  };

  // ===== HELPER QUESTION FUNCTIONS =====
  /**
   * Generate new random helper questions
   * 
   * This allows players to get fresh question ideas during gameplay
   */
  const generateNewQuestions = () => {
    const questions = generateHelperQuestions();
    setGameState(prev => ({
      ...prev,
      helperQuestions: questions
    }));
  };

  // ===== RETURN HOOK INTERFACE =====
  /**
   * Return all the state and functions that components need
   * 
   * This provides a clean interface for components to use without
   * having to know about the internal state management logic.
   */
  return {
    // === GAME STATE ===
    gameState,
    
    // === NAVIGATION ===
    goToScreen,
    
    // === GAME SETUP ===
    handlePlayerInputChange,
    startGame,
    showError,
    
    // === PLAYER REVEALS ===
    startPlayerReveal,
    getCurrentPlayer,
    getCurrentPlayerNumber,
    goToNextPlayer,
    
    // === GAME MANAGEMENT ===
    resetAllLocations,
    startNewGame,
    toggleRemoveLocationAfterPlay,
    toggleEveryoneSpyMode,
    toggleRolesMode,
    addCustomLocation,
    removeCustomLocation,
    restorePlayedLocation,
    getCurrentAvailableLocations,
    getCurrentPlayedLocations,
    
    // === AUDIO ===
    speakLocations,
    
    // === HELPER QUESTIONS ===
    generateNewQuestions,
  };
}
