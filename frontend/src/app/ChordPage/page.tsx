"use client";
import { useState } from "react";
import Search from "../components/Search"
import Chords from "../components/Chords";
import style from "./page.module.css";

export default function ChordPage() {
  const [chordProgression, setChordProgression] = useState("");
  return(
    <div className={style.chordPage}>
        <h1 className={style.text}>Let's get started</h1>
        <Search setChordProgression={setChordProgression}/>
        <Chords chordProgression={chordProgression}/>
    </div>
  )
}