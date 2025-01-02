"use client"

import { useState } from "react";
import Square from "../Square";
import style from "./board.module.css"

export default function Board() {
    const [squares, setSquares] = useState(new Array(9).fill(null));
    const [character, setCharacter] = useState("X");
    const [timeline, setTimeline] = useState(new Array(0));
    let winner = calculateWinner(squares);
    let header = "";

    if (winner) {
        header = "Winner: " + winner;
    } else {
        header = "Turn: " + character;
    }

    function toggleCharacter() {
        if (character == "X") {
            setCharacter("O")
            return;
        }
        setCharacter("X");
    }

    function handleClick(index: number) {
        if (squares[index] != null || calculateWinner(squares)) {
            return;
        }
        const nextTimeline = timeline.slice();
        nextTimeline.push({character, squares});
        setTimeline(nextTimeline);

        const nextSquares = squares.slice();
        nextSquares[index] = character;
        toggleCharacter();
        setSquares(nextSquares);
    }

    function goBackTo(index: number) {
        const nextSquares = timeline[index].squares.slice();
        const nextCharacter = timeline[index].character;
        const nextTimeline = timeline.slice(0, index);

        setSquares(nextSquares);
        setCharacter(nextCharacter);
        setTimeline(nextTimeline);
    }

    return <>
        <h1>{header}</h1>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <ul className={style["unstyled-list"]}>
            {timeline.map((_, index: number) =>
                <li>
                    <button onClick={() => goBackTo(index)}>Go back to step {index + 1}</button>
                </li>
            )}
        </ul>
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
