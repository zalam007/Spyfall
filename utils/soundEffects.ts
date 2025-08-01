// Sound effects system for Spyfall game
// Uses Web Audio API to generate sounds programmatically

interface SoundConfig {
  type: 'beep' | 'success' | 'error' | 'click' | 'reveal' | 'special';
  frequency?: number;
  duration?: number;
  volume?: number;
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    try {
      // Create AudioContext (modern browsers)
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Web Audio API not supported, sound effects disabled');
      this.isInitialized = false;
    }
  }

  private async resumeAudioContext() {
    // Modern browsers require user interaction before playing audio
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  private playTone(frequency: number, duration: number, volume: number = 0.3, type: OscillatorType = 'sine') {
    if (!this.isInitialized || !this.audioContext) return;

    this.resumeAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    // Create a smooth fade in/out envelope
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration - 0.01);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private playChord(frequencies: number[], duration: number, volume: number = 0.2) {
    if (!this.isInitialized || !this.audioContext) return;

    frequencies.forEach(freq => {
      this.playTone(freq, duration, volume / frequencies.length);
    });
  }

  // Generic menu click sound
  playMenuClick() {
    this.playTone(800, 0.1, 0.2, 'square');
  }

  // Start game button - triumphant chord
  playStartGame() {
    // Play a major chord (C-E-G) with rising pitch
    this.playChord([523, 659, 784], 0.4, 0.3);
    setTimeout(() => {
      this.playTone(1047, 0.2, 0.25, 'sine');
    }, 200);
  }

  // New game button - fresh start sound
  playNewGame() {
    // Rising sequence of notes
    const notes = [440, 554, 659, 831];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playTone(note, 0.15, 0.2, 'triangle');
      }, index * 80);
    });
  }

  // See my location button - reveal sound
  playSeeLocation() {
    // Mysterious reveal sound - low to high sweep
    if (!this.isInitialized || !this.audioContext) return;
    
    this.resumeAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Frequency sweep from low to high
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.5);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  // I've seen my role button - confirmation sound
  playSeenRole() {
    // Double confirmation beep
    this.playTone(660, 0.12, 0.2, 'sine');
    setTimeout(() => {
      this.playTone(880, 0.12, 0.2, 'sine');
    }, 120);
  }

  // Reset all locations button - special reset sound
  playResetLocations() {
    // Descending cascade of notes (like things falling back into place)
    const notes = [1047, 831, 659, 523, 415];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playTone(note, 0.2, 0.15, 'triangle');
      }, index * 100);
    });
  }

  // Error sound - when invalid input is entered
  playError() {
    // Harsh error sound - low frequency buzz
    this.playTone(150, 0.15, 0.3, 'square');
    setTimeout(() => {
      this.playTone(120, 0.15, 0.3, 'square');
    }, 100);
    setTimeout(() => {
      this.playTone(100, 0.2, 0.3, 'square');
    }, 200);
  }

  // Generic success sound
  playSuccess() {
    // Happy ascending arpeggio
    const notes = [523, 659, 784, 1047];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playTone(note, 0.15, 0.18, 'sine');
      }, index * 100);
    });
  }
}

// Create a single instance to use throughout the app
export const soundManager = new SoundManager();

// Convenience functions for easy use in React components
export const playMenuClick = () => soundManager.playMenuClick();
export const playStartGame = () => soundManager.playStartGame();
export const playNewGame = () => soundManager.playNewGame();
export const playSeeLocation = () => soundManager.playSeeLocation();
export const playSeenRole = () => soundManager.playSeenRole();
export const playResetLocations = () => soundManager.playResetLocations();
export const playError = () => soundManager.playError();
export const playSuccess = () => soundManager.playSuccess();
