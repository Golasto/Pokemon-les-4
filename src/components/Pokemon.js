import {useEffect, useState} from "react";

export default function Pokemon({name}) {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState([]);

    const abilities = [];
    let moves = 0;

 function getData() {
     console.log(name)
        fetch("https://pokeapi.co/api/v2/pokemon/" + name)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    setIsLoaded(true)
                }
            )
    }
    function getAbilities() {
        for (let i = 0; i < data.abilities.length; i++) {
            abilities.push(<p>{data.abilities[i].ability.name}</p>)
        }
        moves = data.moves.length;
    }
    useEffect(() => {
        if (data.length === 0)
        getData();
    }, [data]);

    if (isLoaded) {
        if (data.length !== 0) {
            getAbilities()
            return(
                <>
                    <div className="pokemonContainer">
                    <div className="pokemonCard">
                    <h1>{data.forms[0].name}</h1>
                    <img src={data.sprites.other['official-artwork'].front_default} alt="" />
                    <h2>Abilities: {abilities}</h2>
                    <p>Weight: {data.weight}</p>
                    <p>Moves: {moves}</p>
                    </div>
                    </div>
                </>
            )
        }else {
            return <div>Loading...</div>
        }

    }

}