"use client"
import style from "./Chords.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Chords() {
    const router = useRouter();

    const [chords, setChords] = useState(["", "", "", ""]);
    const [songs, setSongs] = useState<any[]>([]);
        
    const handleInputChange = (index: number, value: string) => {
        const newChords = [...chords];
        newChords[index] = value;
        setChords(newChords);
    };

    useEffect(() => {
        console.log("Updated Chords:", chords);
    }, [chords]);

    const makePlaylist = async () => {
        try {
            const chordQuery = chords
            .filter(chord => chord.trim() !== "") // Remove empty inputs
            .join(",");

            if (!chordQuery) {
                console.error("Please enter at least one chord!"); // Use console directly
                return;
            }

            // Send GET request with chords as query parameter
            const response = await fetch(`/api/hooktheory?cp=${encodeURIComponent(chordQuery)}`);

            if (!response.ok) throw new Error("Failed to fetch data from API");

            const data = await response.json();

            console.log("API Response:", data);
            setSongs(data);

            // Save song data to localStorage
            localStorage.setItem("songs", JSON.stringify(data));

            // Navigate to SongPage
            router.push("/SongPage");
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    return (
        <div className={style.bg}>
            <h1 className={style.h1}>Your Chord Progression:</h1>
            <div className={style.chords}>
                {chords.map((chord, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="chord"
                        className={style.chord}
                        value={chord}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>
            <button onClick={makePlaylist} className={style.button}>Make my Playlist</button>
        </div>
    );
}
