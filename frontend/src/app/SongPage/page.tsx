"use client"
import Songs from "../components/Songs"
import style from "./page.module.css";

export default function SongPage() {
  const songs = JSON.parse(localStorage.getItem("songs") || "[]");
  return(
    <div className={style.songPage}>
        <h1 className={style.text}>Your Progression Playlist</h1>
        <Songs songs={songs}/>
    </div>
  )
}