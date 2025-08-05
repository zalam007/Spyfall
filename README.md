# Spyfall 🕵️

A modern, mobile-first web version of the classic party game Spyfall. Pass the device around, reveal your secret role, and use clever questions to find the spy—or blend in if you are the spy!

## How to Play

- Enter the number of players (3 or more)
- Each player secretly views their role and location (except the spy, who only knows they're the spy)
- Players take turns asking questions to deduce the spy or, if you're the spy, guess the location
- Win by either identifying the spy or, as the spy, guessing the location

## Features

- **Everyone is Spy mode**: Play a chaotic round where all players are spies
- **Custom locations & roles**: Add, remove, and reset locations and roles
- **Role toggle**: Option to play with or without specific character roles
- **Helper questions**: Built-in question generator
- **Text-to-speech**: Hear location lists aloud
- **Card flip animation & sound effects**
- **Mobile-optimized, responsive UI**

## Tech Stack & Implementation

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: CSS 3D transforms via styled-jsx
- **Audio**: Web Audio API for sound effects
- **Speech**: Web Speech API for text-to-speech
- **Game logic**: Centralized in a custom React hook (`useSpyfallGame`)
- **Deployment**: Vercel (auto-deploy from main branch)

---

Created by [Zami](https://github.com/zalam007/Spyfall)
Play online on [spyfall-gamme.vercel.app](https://spyfall-gamme.vercel.app/)
