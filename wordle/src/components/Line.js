import React from "react";
import "./Line.css";

const word_length = 5;

const Line = ({ guess, isFinal, solution }) => {
  const tiles = [];

  for (let i = 0; i < word_length; i++) {
    const char = guess[i]
    let classNamea = "tile"

    if (isFinal) {
        if (char === solution[i]) {
            classNamea += ' correct'
        } else if(solution.includes(char)) {
            classNamea += ' hasChar'
        } else {
            classNamea += ' incorrect'
        }
    }

    tiles.push(
      <div key={i} className={classNamea}>
        {char}
      </div>
    );
  }

  return <div className="line">{tiles}</div>;
};
export default Line;
