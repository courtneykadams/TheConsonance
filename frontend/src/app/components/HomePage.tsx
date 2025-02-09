"use client"
import style from "./HomePage.module.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    const getStarted = () => {
        router.push('../ChordPage');
    }

    return (
        <section className={style.bg}>
            <div className={style.text}>
                <h2 className={style.h2}>Welcome To</h2>
                <h1 className={style.h1}>The Consonance</h1>
                <h3 className={style.h3}>Your musical journey starts here! Our app uses AI to generate 
                    the perfect chord progression based on your mood, genre, or any other input you 
                    provide. Once you've selected your preferences, we'll display a custom chord 
                    progression and even take it a step further by finding songs that feature that same 
                    progression. Whether you're creating your own music or just looking for fresh tunes, 
                    The Consonance brings the power of music and AI together in one easy-to-use platform!
                </h3>
            </div>
            <button onClick={getStarted} className={style.button}>Get Started</button>
        </section>
    );
}