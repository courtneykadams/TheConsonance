"use client"
import { useState } from "react";
import style from "./Search.module.css";

export default function Search() {

    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const generate = () => {
        console.log(searchInput);
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