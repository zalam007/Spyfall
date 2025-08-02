/**
 * Home Page Component - Main Entry Point
 * 
 * This is the main page that users see when they visit the Spyfall game.
 * It simply renders the main SpyfallGame component, which handles all
 * the game logic and screen routing.
 * 
 * The page component is kept minimal following Next.js best practices,
 * with all the complex logic contained within the game component itself.
 */

import SpyfallGame from '../components/SpyfallGameNew'

/**
 * Next.js Home Page Component
 * 
 * Entry point for the Spyfall game application.
 * Renders the main game component within the Next.js app structure.
 */
export default function Home() {
  return <SpyfallGame />
}
