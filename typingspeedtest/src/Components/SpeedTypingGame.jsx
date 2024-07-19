import React, { useState, useEffect, useRef } from "react";
import "./SpeedTypingGame.css";
import TypingArea from "./TypingArea"; // Import the TypingArea component

const SpeedTypingGame = () => {
  const paragraphs = [
    "A plant is one of the most important living things that develop on the earth and is made up of stems, leaves, roots, and so on.Parts of Plants: The part of the plantthat developed beneath the soil is referred to as root and the part that grows outside of the soil is known as shoot.The shoot consists of stems, branches, leaves, fruits, and flowers.Plants are made up of six main parts: roots, stems, leaves, flowers, fruits, and seeds.",
    "The root is the part of the plant that grows in the soil.The primary root emerges from the embryo.Its primary function is to provide the plant stability in the earth and make other mineral salts from the earth available to the plan for various metabolic processes There are three types of roots i.e.Tap Root, Adventitious Roots, and Lateral Root.The roots arise from the parts of the plant and not from the rhizomes roots.",
    "Stem is the posterior part that remains above the ground and grows negatively geotropic. Internodes and nodes are found on the stem.Branch, bud, leaf, petiole, flower, and inflorescence on a node are all those parts of the plant that remain above the ground and undergo negative subsoil development.The trees have brown bark and the young and newly developed stems are green.The roots arise from the parts of plant and not from the rhizomes roots.",
    "It is the blossom of a plant. A flower is the part of a plant that produces seeds, which eventually become other flowers.They are the reproductive system of a plant. Most flowers consist of 04 main parts that are sepals, petals, stamens, and carpels.The female portion of the flower is the carpels.The majority of flowers are hermaphrodites,meaning they have both male and female components.Others may consist of one of two parts and may be male or female.",
    "An aunt is a bassoon from the right perspective. As far as can estimate, some posit the melic myanmar to be less than kutcha.One cannot separate foods from blowzy bows.The scampish closet reveals itself as a sclerous llama to those who look.A hip is the skirt of a peak.Some hempy laundries are thought of simply as orchids.A gum is a trumpet from the right perspective.A freebie flight is a wrench of the mind.Someposit the croupy.",
  ];

  const [typingText, setTypingText] = useState("");
  const [inpFieldValue, setInpFieldValue] = useState("");
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const inputRef = useRef(null);

  const loadParagraph = () => {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    const content = Array.from(paragraphs[ranIndex]).map((letter, index) => (
      <span
        key={index}
        style={{
          color: letter !== " " ? "black" : "transparent",
        }}
        className={`char ${index === 0 ? "active" : ""}`}
      >
        {letter !== " " ? letter : "_"}
      </span>
    ));
    setTypingText(content);
    setInpFieldValue("");
    setCharIndex(0);
    setMistakes(0);
    setIsTyping(false);
    setTimeLeft(maxTime);
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && charIndex > 0 && timeLeft > 0) {
      const characters = document.querySelectorAll(".char");
      const currentCharIndex = charIndex - 1;

      if (characters[currentCharIndex].classList.contains("correct")) {
        characters[currentCharIndex].classList.remove("correct");
      }
      if (characters[currentCharIndex].classList.contains("wrong")) {
        characters[currentCharIndex].classList.remove("wrong");
        setMistakes(mistakes - 1);
      }
      characters[charIndex].classList.remove("active");
      characters[currentCharIndex].classList.add("active");
      setCharIndex(currentCharIndex);
      updateWPMAndCPM();
    }
  };

  const initTyping = (event) => {
    const characters = document.querySelectorAll(".char");
    let typedChar = event.target.value.slice(-1);

    if (charIndex < characters.length && timeLeft > 0) {
      let currentChar = characters[charIndex].innerText;
      if (currentChar === "_") currentChar = " ";

      if (!isTyping) {
        setIsTyping(true);
      }

      if (typedChar === currentChar) {
        characters[charIndex].classList.add("correct");
      } else {
        characters[charIndex].classList.add("wrong");
        setMistakes(mistakes + 1);
      }

      characters[charIndex].classList.remove("active");
      setCharIndex(charIndex + 1);

      if (charIndex + 1 < characters.length) {
        characters[charIndex + 1].classList.add("active");
      }

      updateWPMAndCPM();
    } else {
      setIsTyping(false);
    }

    setInpFieldValue(event.target.value);
  };

  const updateWPMAndCPM = () => {
    const timeSpent = maxTime - timeLeft;
    const grossWPM = (charIndex - mistakes) / 5 / (timeSpent / 60);
    const grossCPM = (charIndex - mistakes) / (timeSpent / 60);

    setWPM(Math.max(0, Math.round(grossWPM)));
    setCPM(Math.max(0, Math.round(grossCPM)));
  };

  const resetGame = () => {
    loadParagraph();
  };

  useEffect(() => {
    loadParagraph();
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        updateWPMAndCPM();
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTyping(false);
    }

    return () => clearInterval(interval);
  }, [isTyping, timeLeft]);

  return (
    <div className="container">
      <input
        type="text"
        className="input-field"
        ref={inputRef}
        value={inpFieldValue}
        onChange={initTyping}
        onKeyDown={handleKeyDown}
      />
      <TypingArea
        typingText={typingText}
        inpFieldValue={inpFieldValue}
        timeLeft={timeLeft}
        mistakes={mistakes}
        WPM={WPM}
        CPM={CPM}
        initTyping={initTyping}
        handleKeyDown={handleKeyDown}
        resetGame={resetGame}
      />
      <button onClick={resetGame} className="reset-button">
        Try Again
      </button>
    </div>
  );
};

export default SpeedTypingGame;
