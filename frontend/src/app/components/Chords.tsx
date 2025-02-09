"use client"
import style from "./Chords.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface ChordsProps {
    chordProgression: string;
}

export default function Chords({ chordProgression }: ChordsProps) {

    const router = useRouter();

    const [songs, setSongs] = useState<any[]>([]);

    const lines = chordProgression ? chordProgression.split("\n") : [];
    const romanNumerals = lines[0] || "No chord progression generated yet.";
    const badNumbers = lines[1] || "";
    const numbers = badNumbers.replace(/\s+/g, '').trim(); // Remove whitespace and trim



    const makePlaylist = async () => {
        if (!numbers) {
            console.error("No number progression available to create a playlist.");
            return;
        }
        if (!/^\d+(,\d+)*$/.test(numbers)) {
            console.error("Invalid number progression.");
            return;
        }
        const requestUrl = `/api/hooktheory?cp=${encodeURIComponent(numbers)}`;
        console.log("Fetching from:", requestUrl);
        try {
            // Send GET request with chords as query parameter
            const response = await fetch(requestUrl);
            
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

    const returnHome = () => {
        router.push('./');
    }

    return (
        <div className={style.bg}>
            <h1 className={style.h1}>Your Chord Progression:</h1>
            <div className={style.chords}>
                <p>{romanNumerals}</p>
            </div>
            <button onClick={makePlaylist} className={style.button}>Make my Playlist</button>
            <button onClick={returnHome} className={style.homeButton}>Home</button>
        </div>
    );
}
