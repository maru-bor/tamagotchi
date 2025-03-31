import 'bootstrap/dist/css/bootstrap.min.css'
import catImg from './assets/cat.png';
import dogImg from './assets/dog.png';
import catSleep from './assets/cat_sleep.png';
import dogSleep from './assets/dog_sleep.png';
import {useEffect, useState} from "react";

const pets : string[] = ["dog", "cat"];
const petImages : {[index: string]:string} = {
    dog : dogImg,
    cat : catImg,
};

const petsSleep : {[index: string]:string} = {
    dog: dogSleep,
    cat: catSleep,

};

export default function PetChoice(){
    const [pet, setPet] = useState(() => localStorage.getItem("pet") || "animal");
    const [hunger, setHunger] = useState(() => Number(localStorage.getItem("hunger")) || 50);
    const [energy, setEnergy] = useState(() => Number(localStorage.getItem("energy")) || 50);
    const [happiness, setHappiness] = useState(() => Number(localStorage.getItem("happiness")) || 50);
    const [position, setPosition] = useState(0);
    const [isSleeping, setIsSleeping] = useState(false);


    useEffect(() => {
        localStorage.setItem("pet", pet);
        localStorage.setItem("hunger", hunger.toString());
        localStorage.setItem("energy", energy.toString());
        localStorage.setItem("happiness", happiness.toString());
    }, [pet, hunger, energy, happiness]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHunger((h) => Math.max(0, h - 5));
            if (!isSleeping) {
                setEnergy((e) => Math.max(0, e - 3));
                setHappiness((h) => Math.max(0, h - 2));
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [isSleeping]);

    useEffect(() => {
        if (!isSleeping) {
            const moveInterval = setInterval(() => {
                setPosition((pos) => pos + (Math.random() > 0.5 ? 10 : -10));
            }, 2000);
            return () => clearInterval(moveInterval);
        }
    }, [isSleeping]);


    useEffect(() => {
        let sleepInterval = 0;
        if (isSleeping) {
            sleepInterval = setInterval(() => {
                setEnergy((e) => Math.min(100, e + 5));
            }, 2000);
            return () => clearInterval(sleepInterval);
        }

    }, [isSleeping]);

    const feed = () => setHunger((h) => isSleeping ? h : Math.min(100, h + 20));
    const play = () => setHappiness((h) => isSleeping ? h : Math.min(100, h + 20));
    const toggleSleep = () => setIsSleeping((s) => !s);

    return (
        <div className="app">
            <select value={pet} onChange={(e) => setPet(e.target.value)}>
                {pets.map((p) => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
            <div className="d-flex justify-content-between" >
                <div className="stats" >
                    <p>hunger: {hunger}</p>
                    <p>energy: {energy}</p>
                    <p>happiness: {happiness}</p>
                </div>
                <div className="pet-image" >
                    <img
                        src={isSleeping ? petsSleep[pet] : petImages[pet]}
                        alt={pet}
                        width={400}
                        height={300}
                        style={{ transform: `translateX(${position}px)`, transition: "transform 0.5s ease-in-out" }}
                    />
                </div>
                <div className="actions">
                    <button onClick={feed}>feed</button>
                    <button onClick={play}>play</button>
                    <button onClick={toggleSleep}>{isSleeping ? "wake up" : "sleep"}</button>
                </div>
            </div>

        </div>
    );
}
