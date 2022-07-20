import { useEffect, useState } from "react";
import "./App.css";
import RandomWord from "./components/RandomWord";
import Line from "./components/Line";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentlyGuess, setCurrentlyGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setSolution(RandomWord);
  }, []);

  useEffect(() => {
    const typeChangeHanlder = (event) => {
      if (gameOver) {
        return;
      }
      if (event.key === "Enter") {
        if (currentlyGuess.length !== 5) {
          return;
        }
        const newGuess = [...guesses]
        newGuess[guesses.findIndex(v => v == null)] = currentlyGuess
        setGuesses(newGuess)
        setCurrentlyGuess('')


        const isCorrect = solution === currentlyGuess;
        if (isCorrect) {
          setGameOver(true);
        }
      }
      if (currentlyGuess.length >= 5) {
        return;
      }
      if (event.key === "Backspace") {
        setCurrentlyGuess(currentlyGuess.slice(0, -1));
        return;
      }

      setCurrentlyGuess((lastGuess) => lastGuess + event.key);
    };
    window.addEventListener("keydown", typeChangeHanlder);

    return () => window.removeEventListener("keydown", typeChangeHanlder);
  }, [currentlyGuess, gameOver, solution, guesses]);

  return (
    <div className="main">
      {guesses.map((guess, i) => {
        const isCurrent = i === guesses.findIndex((v) => v == null);
        return (
          <Line
            guess={isCurrent ? currentlyGuess : guess ?? ""}
            isFinal={!isCurrent && guess !== null}
            solution={solution}
          />
        );
      })}
      {solution}
    </div>
  );
}

export default App;
