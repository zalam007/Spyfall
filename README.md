# Spyfall - Party Game 🕵️

A modern web-based version of the popular party game Spyfall, built with Next.js and React. This is a pass-and-play version where players share a single device to reveal their roles.

## 🎮 How to Play

1. **Setup**: Enter the number of players (3-20)
2. **Role Assignment**: Pass the device around so each player can secretly view their role
3. **The Spy**: One player will be assigned as the spy (they won't know the location)
4. **Gameplay**: Take turns asking questions about the location to figure out who the spy is
5. **Win Conditions**: 
   - **Spy wins** if they correctly guess the location
   - **Everyone else wins** if they identify the spy

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎯 Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Multiple Locations**: Includes Casino, Bank, Prison, Castle, and many more!
- **Helper Questions**: Built-in question suggestions to keep the game flowing
- **Text-to-Speech**: Click to hear location lists read aloud (where supported)
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🗺️ Available Locations

- Casino
- Bank  
- Prison
- Castle
- The Pyramids
- China
- The White House
- Agora Hills
- Zami's house
- Disneyland
- High-School
- Ship
- Costco
- Funeral
- Wedding

## 🔧 Tech Stack

- **Framework**: Next.js 14
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Speech**: Web Speech API (where supported)

## 📱 Mobile-Friendly

The game is fully responsive and works great on phones and tablets, making it perfect for parties and gatherings!

## 🎨 Original Inspiration

This project was converted from a Code.org App Lab implementation to a modern web application, maintaining all the original game logic while adding a professional UI and modern web features.

## 📝 License

This project is open source and available under the MIT License.