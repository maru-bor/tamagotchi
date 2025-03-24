import 'bootstrap/dist/css/bootstrap.min.css'
import catImg from './assets/cat.png';
import dogImg from './assets/dog.png';

export default function PetChoice(){
    return (
        <>
            <img src={catImg} alt="Pet cat"/>
            <img src={dogImg} alt="Pet dog"/>
        </>

    );
}
