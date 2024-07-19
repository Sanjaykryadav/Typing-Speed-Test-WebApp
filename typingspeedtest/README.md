# React + Vite

* Speed Typing Game

    => This is a speed typing game built with React that tests and improves your typing speed and accuracy. The game presents random paragraphs for you to type, 
       tracks 
       your mistakes, and calculates your WPM (Words Per Minute) and CPM (Characters Per Minute).

* Features

   * Random Paragraphs: Presents a random paragraph each time the game is reset.
     
   * Real-time Feedback: Highlights correct and incorrect characters as you type.
   * WPM and CPM Calculation: Tracks your typing speed and updates it in real-time.
   * Timer: Counts down from 60 seconds.
   * Reset Game: Option to reset the game and try again.

* Installation
  
  1. Clone the repository:
  2. **git clone https://github.com/yourusername/speed-typing-game.git **
  3. Navigate to the project directory:
  4. ** cd speed-typing-game **
  5. Install dependencies:
  6. ** npm install
  7. Start the development server:
  8. ** npm start


* Usage
  1. Open your browser and navigate to http://localhost:3000.
  2. Start typing the paragraph displayed on the screen.
  3. The game will automatically track your mistakes, WPM, and CPM.
  4. Use the "Try Again" button to reset the game and get a new paragraph.
  
* Components
 * SpeedTypingGame
 -> This is the main component of the game. It handles the state and logic for the game, including loading paragraphs, tracking user input, calculating WPM and 
   CPM, and resetting the game.

* TypingArea
 -> This component is responsible for displaying the typing text, user input, timer, and statistics.

* Code Overview
  * State Variables:
  
  -> typingText: The paragraph to be typed.
  -> inpFieldValue: The current value of the input field.
  -> timeLeft: The time remaining in the game.
  -> charIndex: The current character index being typed.
  -> mistakes: The number of mistakes made.
  -> isTyping: Boolean indicating if typing is in progress.
  -> WPM: Words per minute.
  -> CPM: Characters per minute.
  
* Functions:

  * loadParagraph(): Loads a new random paragraph.
  * handleKeyDown(event): Handles the Backspace key functionality.
  * initTyping(event): Initializes typing and updates character states.
  * updateWPMAndCPM(): Updates WPM and CPM based on typing speed and accuracy.
  * resetGame(): Resets the game state and loads a new paragraph.
  * 
  
* Usage Instructions
 * Starting the Game: The game starts as soon as the user begins typing in the input field. The timer counts down from 60 seconds.
 * Typing: As the user types, correct characters are highlighted in green, and incorrect characters in red. The WPM and CPM are updated in real-time.
 * Resetting the Game: Click the "Try Again" button to reset the game state and load a new paragraph.
  
 
    
  


