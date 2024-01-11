# League of Xmas

## Overview

League of Xmas is a comprehensive website that allows users to explore information about champions, players, and their recent game statistics in the popular online multiplayer game, League of Legends. The website provides a user-friendly interface to search for champions, view player profiles, and analyze their performance.

## Features

### 1. Champion Information

Users can easily search and explore details about all League of Legends champions. The site provides information such as champion name, role, difficulty level, and a set of suggested runes and spells, but also all available skins.

### 2. Player Search

- **Server Options:** Users can search for players across three major servers: Europe, North America, and Korea.
- **Player Profile:** View detailed information about a specific player, including their in-game name, level, and profile icon.

### 3. Recent Match History

- **Last 10 Matches:** Check out the latest ten matches played by a selected player.
- **Match Details:** Access specific details about each match, including game mode, duration, outcome, and performance statistics.

### 4. Competitive Ranking

- **Ranked Grading:** Discover the competitive rank of the searched player, including their current division and tier.
- **LP and Win/Loss Ratio:** View the player's League Points (LP) and their win/loss ratio.

### 5. Champion Mastery

- **Mastery Levels:** Explore the player's mastery levels with various champions.
- **Top Champions:** Identify the player's most mastered champions and their corresponding mastery points.

### 6. User Authentication

- **User Login:** Users can create accounts and log in to the website.
- **Profile Icon Display:** After logging in, the user's profile icon is displayed in the top right corner, providing a personalized experience.

## How to Use

1. **Champion Search:**

   - Visit the "Champions" section to search and learn about different champions.
   - Use the search bar to find a specific champion by name.

2. **Player Search:**

   - Navigate to the "Player Search" section.
   - Select the desired server and enter the player's in-game name.
   - Explore the player's profile, recent matches, and competitive ranking.

3. **User Authentication:**

   - Click on the "Login" button to create an account or log in.
   - After logging in, the user's profile icon will be displayed in the top right corner.

4. **Explore Match History:**

   - Select a player and view their last 10 matches to analyze performance.
   - Check specific match details for a more in-depth understanding.

5. **Competitive Ranking and Mastery:**
   - Learn about the competitive rank and LP of the searched player.
   - Explore the player's champion mastery levels and top champions.

## Technologies Used

- **Frontend:** Vue.js, HTML5, SCSS
- **Backend:** Laravel
- **Database:** MySQL
- **API Integration:** Riot Games API for League of Legends data

## Getting Started

To run the League of Xmas locally, follow these steps:

1. Clone the repository: `git clone https://github.com/MaxPredathor/league-of-xmas-vue`
2. Install dependencies: `npm install`
3. Install all required libraries: `npm i @fortawesome/fontawesome-free axios bootstrap router@4 swiper sass`.
4. Obtain API keys from the Riot Games Developer Portal.
5. Set up environment variables for the API keys.
6. Start the server: `npm run dev`

If you want to also access the login/register features, please have a look at [this repository](https://github.com/MaxPredathor/league-of-xmas-laravel).

## Contributors

- [Massimiliano Gilli](https://github.com/MaxPredathor)
- [Oder Risi](https://github.com/IIODERII)
- [Iacopo De Palatis](https://github.com/iaio998)
- [Vinicius De Miranda](https://github.com/Vinffs)
- [Matteo Tuveri](https://github.com/MatteoTuveri)

Feel free to contribute, report issues, or suggest enhancements to make League of Xmas even better!
