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
    const [pet, setPet] = useState(localStorage.getItem("pet") || "");
    const [petLocked, setPetLocked] = useState(false);
    const [hunger, setHunger] = useState(Number(localStorage.getItem("hunger")) || 50);
    const [energy, setEnergy] = useState(Number(localStorage.getItem("energy")) || 50);
    const [happiness, setHappiness] = useState(Number(localStorage.getItem("happiness")) || 50);
    const [position, setPosition] = useState(0);
    const [isSleeping, setIsSleeping] = useState(false);
    const resetPet = () => {
        setPet("");
        setPetLocked(false);
        setHunger(50);
        setEnergy(50);
        setHappiness(50);
        setIsSleeping(false);
        setPosition(0);
        localStorage.clear();
    };

    useEffect(() => {
        const storedPet = localStorage.getItem("pet");
        const storedPetLocked = localStorage.getItem("petLocked") === "true";

        if (storedPet && storedPetLocked) {
            setPet(storedPet);
            setPetLocked(true);
        } else {
            let chosenPet  = null;
            // @ts-ignore
            while (!pets.includes(chosenPet)) {
                chosenPet = prompt("Choose your virtual pet: ${pets.join(", ")}");
                if (chosenPet === null) {
                    chosenPet = "Pes";
                }
            }
            // @ts-ignore
            setPet(chosenPet);
            setPetLocked(true);
            // @ts-ignore
            localStorage.setItem("pet", chosenPet);
            localStorage.setItem("petLocked", "true");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("hunger", hunger.toString());
        localStorage.setItem("energy", energy.toString());
        localStorage.setItem("happiness", happiness.toString());
    }, [hunger, energy, happiness]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHunger((h) => Math.min(100, h + 5));
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


    useEffect(() => {
        if (hunger === 100 && energy === 0 && happiness === 0) {
            alert("Your pet died because you neglected it! Your virtual pet will be reset now.. ");
            resetPet();
        }
    }, [hunger, energy, happiness]);

    const feed = () => setHunger((h) => isSleeping ? h : Math.max(0, h - 7));
    const play = () => setHappiness((h) => isSleeping ? h : Math.min(100, h + 20));
    const toggleSleep = () => setIsSleeping((s) => !s);

    // @ts-ignore
    const handlePetSelection = (e) => {
        const selectedPet = e.target.value;
        if (!petLocked) {
            setPet(selectedPet);
            setPetLocked(true);
        }
    };
    return (
        <div className="app">
            {pet &&
                <div className="border" style={{ width: 1000, height: 500 }}>
            <div className="stats" style={{ alignItems : "left" }} >
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
            }


        </div>
    );
}
