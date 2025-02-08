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
                <h1 className={style.h1}>Welcome</h1>
            </div>
            <button onClick={getStarted} className={style.button}>Get Started</button>
        </section>
    );
}