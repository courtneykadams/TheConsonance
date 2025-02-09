"use client"
import { useState } from "react";
import style from "./Search.module.css";

interface SearchProps {
    setChordProgression: (value: string) => void;
}
  
export default function Search({ setChordProgression }: SearchProps) {

    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const generate = async () => {
        console.log(searchInput);
        try {
            // Send POST request to the backend with the search input as prompt
            const response = await fetch("http://localhost:3001/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt: searchInput }),
            });
      
            if (!response.ok) {
              throw new Error("Failed to generate chord progression");
            }
      
            const data = await response.json();
            console.log("Chord progression generated:", data.result);
            // Update the chord progression state in the parent
            setChordProgression(data.result);
          } catch (error) {
            console.error("Error generating chord progression:", error);
          }
    }

    return (
        <div className={style.searchSection}>
            <div className={style.search}>
                <span className={style.searchIcon}>search</span>
                <input
                    type="text"
                    placeholder="Enter a mood or genre to begin"
                    className={style.searchBar}
                    value={searchInput} 
                    onChange={handleInputChange}
                /> 
            </div>
            <button onClick={generate} className={style.button}>Generate</button>
        </div>
    );
}