"use client"
import style from "./Songs.module.css";
import { useRouter } from "next/navigation";

interface Song {
    song: string;
    artist: string;
  }

export default function Songs({ songs }: { songs: Song[] }) {
    const router = useRouter();
    
    const returnHome = () => {
        router.push('./');
    }
    
    return (
        <div className={style.bg}>
            {songs.length > 0 ? (
                <ul className={style.songs}>
                    {songs.map((song, index) => (
                        <li key={index} className={style.song}>
                            <p>{song.song} by {song.artist}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No songs found based on the chord progression.</p>
            )}
            <button onClick={returnHome} className={style.button}>Home</button>

        </div>

    );
}