"use client"
import style from "./Search.module.css";

export default function Search() {

    return (
        <div className={style.search}>
            <span className={style.searchIcon}>search</span>
            <input
                type="text"
                placeholder="Enter a mood or genre to begin"
                className={style.searchBar}
            />      

        </div>
    );
}