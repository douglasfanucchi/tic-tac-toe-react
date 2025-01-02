"use client"

import { MouseEventHandler, useState } from "react";
import Square from "../Square";
import style from "./board.module.css"

export function Board(
    {
        squares,
        character,
        onPlay,
        currentStep
    }: {squares: Array<number>, character: string, onPlay: Function, currentStep: number}
) {
    let winner = calculateWinner(squares);
    let header = "";

    if (winner) {
        header = "Winner: " + winner;
    } else {
        header = "Turn: " + character + " - Step: " + currentStep;
    }

    return <div className="board">
        <h1>{header}</h1>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => onPlay(0)} />
            <Square value={squares[1]} onSquareClick={() => onPlay(1)} />
            <Square value={squares[2]} onSquareClick={() => onPlay(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => onPlay(3)} />
            <Square value={squares[4]} onSquareClick={() => onPlay(4)} />
            <Square value={squares[5]} onSquareClick={() => onPlay(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => onPlay(6)} />
            <Square value={squares[7]} onSquareClick={() => onPlay(7)} />
            <Square value={squares[8]} onSquareClick={() => onPlay(8)} />
        </div>
    </div>
}

export default function Game() {
    const [timeline, setTimeline] = useState([Array(9).fill(null)]);
    const [character, setCharacter] = useState("X");
    const [currentStep, setCurrentStep] = useState(0);

    function goBackTo(index: number) {
        const nextCharacter = (index % 2 == 0) ? "X" : "O";

        setCharacter(nextCharacter);
        setTimeline(timeline.slice(0, index + 1));
        setCurrentStep(index);
    }

    function handleOnPlay(index: number) {
        const square = timeline[timeline.length - 1];
        if (square[index] || calculateWinner(square)) {
            return;
        }
        const nextSquare = square.slice();
        nextSquare[index] = character;

        if (character == "X") {
            setCharacter("O");
        } else {
            setCharacter("X");
        }
        setCurrentStep(currentStep + 1);
        setTimeline([...timeline, nextSquare]);
    }

    return <>
        <div className={style.game}>
            <Board
                squares={timeline[timeline.length - 1]}
                character={character}
                onPlay={handleOnPlay}
                currentStep={currentStep}
            />
            <ul className={style["unstyled-list"]}>
                {timeline.map((_, index: number) =>
                    <li key={index}>
                        <button className={style.button} onClick={() => goBackTo(index)}>
                            {(index == 0) ? "Reset" : "Go back to step " + index}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    </>
}

function calculateWinner(squares: Array<number>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
