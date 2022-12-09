import React, { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';
import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [offset, setOffset] = useState(0);

    async function getData() {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + offset)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result.results);
                    setIsLoaded(true);
                }
            )
    }

    function changePokemon(next) {
        if (next) {
            setOffset(offset + 20)
        } else {
            setOffset(offset - 20)
        }
        console.log(offset)
        getData();
    }

    function disableButtons() {
        if (offset === 0) {
            document.getElementById("p").disabled = true;
        } else {
            document.getElementById("p").disabled = false;
        }
        if (offset > 1140) {
            document.getElementById("n").disabled = true;
        } else {
            document.getElementById("n").disabled = false;
        }
    }

    useEffect(() => {
        getData();
        if (document.getElementById("p") !== null) {
            disableButtons()
        }
    }, [offset])

    if (!isLoaded) {
        return <div>Loading...</div>
    } else if (isLoaded) {
        if (data.length !== 0) {
            return (
                <>
                    <button id="p" onClick={() => changePokemon(false)}>Previous</button>
                    <button id="n" onClick={() => changePokemon(true)}>Next</button>
                    <div className="pokemonData">

                        {data.map(d =>
                            <Pokemon key={d.name} name={d.name} />
                        )}
                    </div>
                </>
            )
        } else {
            return <div>Loading...</div>
        }
    }
}

export default App;