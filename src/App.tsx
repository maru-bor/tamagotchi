import './App.css'
import {useEffect, useState} from "react";
//import PetChoice from "./PetChoice.tsx";
import catImg from './assets/cat.png';
import dogImg from './assets/dog.png';

const pets : string[] = ["dog", "cat"];
const petImages : {[index: string]:string} = {
   dog : dogImg,
   cat : catImg,
};

function App() {
    const [pet, setPet] = useState(() => localStorage.getItem("pet") || "Pes");
    const [hunger, setHunger] = useState(() => Number(localStorage.getItem("hunger")) || 50);
    const [energy, setEnergy] = useState(() => Number(localStorage.getItem("energy")) || 50);
    const [happiness, setHappiness] = useState(() => Number(localStorage.getItem("happiness")) || 50);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        localStorage.setItem("pet", pet);
        localStorage.setItem("hunger", hunger.toString());
        localStorage.setItem("energy", energy.toString());
        localStorage.setItem("happiness", happiness.toString());
    }, [pet, hunger, energy, happiness]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHunger((h) => Math.max(0, h - 5));
            setEnergy((e) => Math.max(0, e - 3));
            setHappiness((h) => Math.max(0, h - 2));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPosition((pos) => pos + (Math.random() > 0.5 ? 10 : -10));
        }, 2000);

        return () => clearInterval(moveInterval);
    }, []);

    const feed = () => setHunger((h) => Math.min(100, h + 20));
    const play = () => setHappiness((h) => Math.min(100, h + 20));
    const sleep = () => setEnergy((e) => Math.min(100, e + 30));

    return (
        <div className="app">
            <h1>Virtuální Tamagotchi</h1>
            <select value={pet} onChange={(e) => setPet(e.target.value)}>
                {pets.map((p) => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
            <div className="stats">
                <p>Hlad: {hunger}</p>
                <p>Energie: {energy}</p>
                <p>Štěstí: {happiness}</p>
            </div>
            <div className="pet-container">
                <img
                    src={petImages[pet]}
                    alt={pet}
                    style={{ transform: `translateX(${position}px)`, transition: "transform 0.5s ease-in-out" }}
                />
            </div>
            <div className="actions">
                <button onClick={feed}>Nakrmit</button>
                <button onClick={play}>Hrát si</button>
                <button onClick={sleep}>Spát</button>
            </div>
        </div>
    );
}

export default App
