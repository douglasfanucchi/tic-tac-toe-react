"use client"

import { MouseEventHandler } from "react";
import styles from "./square.module.css"

export default function Square(
    {value, onSquareClick}: {value?: React.ReactNode, onSquareClick: MouseEventHandler<HTMLButtonElement>}
) {
    return <>
        <button
            className={styles.square}
            onClick={onSquareClick}
        >
            <span>{value}</span>
        </button>
    </>;
}
