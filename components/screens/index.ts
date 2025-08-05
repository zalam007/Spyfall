/**
 * Screen Components Index
 * 
 * This file provides a central export point for all screen components.
 * It makes importing multiple screen components cleaner and more organized.
 * 
 * Instead of:
 *   import HomeScreen from './screens/HomeScreen';
 *   import GameEndScreen from './screens/GameEndScreen';
 *   import PlayerRevealScreen from './screens/PlayerRevealScreen';
 * 
 * You can do:
 *   import { HomeScreen, GameEndScreen, PlayerRevealScreen } from './screens';
 */

// Export all screen components for easy importing
export { default as HomeScreen } from './HomeScreen';
export { default as HowToPlayScreen } from './HowToPlayScreen';
export { default as SettingsScreen } from './SettingsScreen';
export { default as NextScreen } from './NextScreen';
export { default as PlayerRevealScreen } from './PlayerRevealScreen';
export { default as GameEndScreen } from './GameEndScreen';
