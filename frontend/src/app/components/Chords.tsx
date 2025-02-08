"use client"
import style from "./Chords.module.css";

export default function Chords() {

    return (
        <div className={style.bg}>
            <h1 className={style.h1}>Your Chord Progression:</h1>
            <div className={style.chords}>
                <h2 className={style.chord}>C</h2>
                <h2 className={style.chord}>G</h2>
                <h2 className={style.chord}>E</h2>
                <h2 className={style.chord}>C</h2>
            </div>
            <button className={style.button}>Make my Playlist</button>
        </div>
        

    );
}