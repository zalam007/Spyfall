// Game data and logic utilities for Spyfall game
// Converted from the original Code.org implementation

// Interface definitions for TypeScript
export interface Location {
  name: string;
  roles: string[];
}

export interface PlayerInfo {
  location: string;
  role: string;
}

// Master list of locations with corresponding roles
// This is the same data from your original Code.org project
export const LOCATIONS: Location[] = [
  { name: "Casino", roles: ["Gambler", "Dealer", "Bartender", "Security", "Entertainer"] },
  { name: "Bank", roles: ["Banker", "Robber", "Security Guard", "Customer", "Manager"] },
  { name: "Prison", roles: ["Warden", "Guard", "Prisoner", "Escapee", "Cook"] },
  { name: "Castle", roles: ["King", "Queen", "Knight", "Maid", "Cook"] },
  { name: "The Pyramids", roles: ["Pharaoh", "Priest", "Explorer", "Archaeologist", "Tourist"] },
  { name: "China", roles: ["Emperor", "Philosopher", "Monk", "Merchant", "Invader"] },
  { name: "The White House", roles: ["President", "First Lady", "Secret Service Agent", "Reporter", "Intern"] },
  { name: "Agora Hills", roles: ["Resident", "Mayor", "Teacher", "Firefighter", "Celebrity"] },
  { name: "Zami's house", roles: ["Zami", "Sibling", "Parent", "Poolman", "Mailman"] },
  { name: "Disneyland", roles: ["Tourist", "Janitor", "Princess", "Ride Operator", "Mickey"] },
  { name: "High-School", roles: ["Principal", "Teacher", "Student", "Custodian", "Athlete", "Nerd"] },
  { name: "Ship", roles: ["Captain", "Navigator", "Prisoner", "Cleaner", "Chef"] },
  { name: "Costco", roles: ["Customer", "Cashier", "Stocker", "Manager", "Sample Giver"] },
  { name: "Funeral", roles: ["Priest", "Family Member", "Friend", "Long Time Enemy", "Gravedigger"] },
  { name: "Wedding", roles: ["Bride", "Groom", "Bridesmaid", "Groomsman", "Officiant"] },
];

// Helper questions for the game - same as your original list
export const HELPER_QUESTIONS = [
  // General location questions
  "What brings you here today?",
  "How are you feeling while here?",
  "Would you bring your family here?",
  "Would you bring a date here?",
  "Do you like coming here?",
  "How often do you come here?",
  "What is the most common thing people do here?",
  "What's the weather like here?",
  "What time of day is it?",
  "Are most people here for work or play/fun?",
  "Is this place positive or negative?",
  "How long do most people stay here?",
  "Can you see any landmarks from where you are?",
  "What's the mood or atmosphere in this place?",
  "What's the most interesting thing you've seen here?",
  "What do you see out the window?",
  "Describe the people around you.",
  "What do you smell?",
  "What kind of activities can you do in this place?",
  "Are there any special rules or regulations at this location?",
  
  // Role-specific questions
  "How did you get here?",
  "What time does your job start?",
  "What time does your job end?",
  "What are you holding in your hand?",
  "What is your role's responsibility in this location?",
  "What tools or equipment does your role use at this location?",
  "What challenges do you face in your role?",
  "Can you share a memorable experience related to your role?",
  "Are there any specific interactions you have in your role?",
  "How do you handle difficult situations in your role?",
  "What skills are essential for someone in your role?",
  "Is your role important?",
  "Can you describe a typical day in your role?",
  "Would you want to be this role?",
  "Do you know anyone who has your role in real life?",
];

/**
 * Assigns locations and roles to players
 * Converted from the original assignPlayerLocationsAndRoles function
 * @param numPlayers - Number of players in the game
 * @returns Object containing player info, common location, and available locations
 */
export function assignPlayerLocationsAndRoles(numPlayers: number) {
  // Create a copy of locations to avoid modifying the original array
  const availableLocations = [...LOCATIONS];
  
  // Choose a random common location for all non-spy players
  const randomLocationIndex = Math.floor(Math.random() * availableLocations.length);
  const commonLocation = availableLocations[randomLocationIndex];
  
  // Remove the selected location from available locations for the final list
  availableLocations.splice(randomLocationIndex, 1);
  
  // Randomly select which player will be the spy
  const spyIndex = Math.floor(Math.random() * numPlayers);
  
  // Initialize array to store each player's assigned location and role
  const playerInfo: PlayerInfo[] = [];
  
  // Make a copy of roles for the selected location to track which ones are used
  let availableRoles = [...commonLocation.roles];
  
  // Assign locations and roles to each player
  for (let i = 0; i < numPlayers; i++) {
    if (i === spyIndex) {
      // This player is the spy - they get special spy info
      playerInfo[i] = { location: "spy", role: "spy" };
    } else {
      // This player gets the common location
      
      // If all roles have been used, reset the available roles
      // This allows role repetition when there are more players than roles
      if (availableRoles.length === 0) {
        availableRoles = [...commonLocation.roles];
      }
      
      // Randomly select an available role
      const roleIndex = Math.floor(Math.random() * availableRoles.length);
      const selectedRole = availableRoles.splice(roleIndex, 1)[0];
      
      // Assign the common location and selected role to this player
      playerInfo[i] = { 
        location: commonLocation.name, 
        role: selectedRole 
      };
    }
  }
  
  return {
    playerInfo,
    commonLocation,
    availableLocations
  };
}

/**
 * Generates a string of all available locations for display
 * Converted from the original updateLocationsString function
 * @param locations - Array of location objects
 * @returns Formatted string of location names
 */
export function generateLocationsString(locations: Location[]): string {
  return locations.map(location => location.name).join('\n');
}

/**
 * Generates a string of all roles for the common location
 * Converted from the original updateRolesString function
 * @param commonLocation - The location object with roles
 * @returns Formatted string of role names
 */
export function generateRolesString(commonLocation: Location): string {
  return commonLocation.roles.join('\n');
}

/**
 * Selects 3 random helper questions for the game
 * Converted from the original updateHelperQuestions function
 * @returns Formatted string with 3 numbered questions
 */
export function generateHelperQuestions(): string {
  const selectedQuestions: string[] = [];
  const usedIndexes: number[] = [];
  
  // Select 3 unique random questions
  for (let i = 1; i <= 3; i++) {
    let questionIndex: number;
    
    // Keep trying until we find a question we haven't used
    do {
      questionIndex = Math.floor(Math.random() * HELPER_QUESTIONS.length);
    } while (usedIndexes.indexOf(questionIndex) !== -1);
    
    // Add the index to used list and the question to selected list
    usedIndexes.push(questionIndex);
    selectedQuestions.push(`${i}. ${HELPER_QUESTIONS[questionIndex]}`);
  }
  
  return selectedQuestions.join('\n');
}

/**
 * Speaks the given text using the Web Speech API (if available)
 * This replaces the playSpeech function from Code.org
 * @param text - Text to speak
 * @param voice - Voice type (not used in web version, kept for compatibility)
 * @param language - Language setting (not used in web version, kept for compatibility)
 */
export function speakText(text: string, voice?: string, language?: string): void {
  // Check if speech synthesis is available in the browser
  if ('speechSynthesis' in window) {
    // Stop any currently playing speech
    window.speechSynthesis.cancel();
    
    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure the speech (you can customize these settings)
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  } else {
    // Fallback for browsers that don't support speech synthesis
    console.warn('Speech synthesis not supported in this browser');
  }
}

/**
 * Stops any currently playing speech
 * This replaces the stopSound function from Code.org for speech
 */
export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
