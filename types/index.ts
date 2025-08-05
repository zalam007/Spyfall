/**
 * Type definitions for the Spyfall game
 * 
 * This file contains all the TypeScript interfaces and types used throughout
 * the Spyfall game application. By centralizing types here, we ensure
 * consistency across all components and make the code more maintainable.
 */

// ===== GAME DATA TYPES =====

/**
 * Represents a single location in the game with its associated roles
 * 
 * Each location has:
 * - name: The display name of the location (e.g., "Casino", "Bank")
 * - roles: Array of roles that can be assigned at this location
 */
export interface Location {
  name: string;      // Name of the location (e.g., "Casino", "Bank", "spy")
  roles: string[];   // Available roles for this location (e.g., ["Gambler", "Dealer"])
}

/**
 * Represents information about a single player in the game
 * 
 * Contains the location and role assigned to a specific player.
 * If a player is the spy, both location and role will be "spy".
 */
export interface PlayerInfo {
  location: string;  // The location this player is "at" (or "spy" if they're the spy)  
  role: string;      // The role this player has (or "spy" if they're the spy)
}

// ===== UI STATE TYPES =====

/**
 * Defines the different screens/states the game can be in
 * 
 * The game flow is:
 * home → howToPlay (optional) → settings → nextScreen → playerReveal → gameEnd
 * 
 * - home: Main menu where players enter number of participants
 * - howToPlay: Instructions screen (accessed from home)
 * - settings: Game settings and preferences
 * - nextScreen: Transition screen between players during role reveals
 * - playerReveal: Shows each player their location and role
 * - gameEnd: Main game screen with questions and possible locations
 */
export type GameScreen = 'home' | 'howToPlay' | 'settings' | 'nextScreen' | 'playerReveal' | 'gameEnd';

// ===== GAME STATE TYPE =====

/**
 * Complete state of the Spyfall game
 * 
 * This interface represents all the data needed to maintain the current
 * state of a Spyfall game session. Used by the main game hook.
 */
export interface GameState {
  // === UI State ===
  currentScreen: GameScreen;        // Which screen is currently displayed
  isCurrentlySpeaking: boolean;     // Whether text-to-speech is currently playing
  
  // === Game Settings ===
  removeLocationAfterPlay: boolean; // Whether to remove locations after they're played
  
  // === Game Setup ===
  numPlayers: number;               // Total number of players in the game
  playerInputValue: string;         // Value from the number input field
  errorMessage: string;             // Error message to display (empty if no error)
  
  // === Game Data ===
  playerInfo: PlayerInfo[];         // Array of all players' locations and roles
  commonLocation: Location | null;  // The actual location for this game (null before game starts)
  availableLocations: Location[];   // All locations shown to players during game
  helperQuestions: string;          // Generated helper questions for this game
  
  // === Current Player Tracking ===
  currentPlayerIndex: number;       // Index of player currently viewing their role (0-based)
}

// ===== COMPONENT PROPS TYPES =====

/**
 * Props for screen components that need access to game state and controls
 */
export interface BaseScreenProps {
  gameState: GameState;
  onScreenChange: (screen: GameScreen) => void;
  onError: (message: string) => void;
}

/**
 * Props for the Home screen component
 */
export interface HomeScreenProps extends BaseScreenProps {
  onStartGame: () => void;
  onPlayerInputChange: (value: string) => void;
}

/**
 * Props for the Player Reveal screen component  
 */
export interface PlayerRevealScreenProps extends BaseScreenProps {
  onNextPlayer: () => void;
  getCurrentPlayer: () => PlayerInfo | null;
}

/**
 * Props for the Settings screen component
 */
export interface SettingsScreenProps extends BaseScreenProps {
  onResetAllLocations: () => void;
  onToggleRemoveLocationAfterPlay: (enabled: boolean) => void;
}

/**
 * Props for the Game End screen component
 */
export interface GameEndScreenProps extends BaseScreenProps {
  onNewGame: () => void;
  onSpeakLocations: () => void;
}

/**
 * Props for the Next Screen (transition between players)
 */
export interface NextScreenProps extends BaseScreenProps {
  onStartPlayerReveal: () => void;
  getCurrentPlayerNumber: () => number;
}

// ===== SOUND EFFECT TYPES =====

/**
 * Available sound effect types in the game
 * 
 * Each sound corresponds to a specific user action and provides
 * auditory feedback to enhance the user experience.
 */
export type SoundType = 
  | 'menuClick'        // Generic menu navigation sound
  | 'startGame'        // Sound when starting a new game  
  | 'newGame'          // Sound when creating a new game
  | 'seeLocation'      // Sound when revealing location/role
  | 'seenRole'         // Sound when confirming role has been seen
  | 'resetLocations'   // Sound when resetting all locations
  | 'error'            // Sound for error conditions
  | 'success';         // Sound for successful actions
