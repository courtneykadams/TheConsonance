import Search from "../components/Search"
import Chords from "../components/Chords";
import style from "./page.module.css";

export default function ChordPage() {
  return(
    <div className={style.bg}>
        <h1>Chord Page!</h1>
        <Search/>
        <Chords/>
    </div>
  )
}