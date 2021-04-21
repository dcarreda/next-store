import axios from "axios";
import { useState, useEffect } from 'react';

const url = "https://pokeapi.co/api/v2/pokemon?limit=151"
const headers = {
    "Cache-Control": "no-cache",
}
function ClientSide() {
    const [pokemon, setPokemon] = useState([]);
    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await axios.get(url, { headers });

            const promises = response.data.results.map(result => {
                return (axios.get(result.url, { headers }));
            })

            const responses = await Promise.all(promises);
            console.log(responses)
            const pokeData = responses.map((r) => {
                return {
                    name: r.data.name,
                    imgUrlNormal: r.data.sprites.front_default,
                    imgUrlShiny: r.data.sprites.front_shiny

                }
            })
            setPokemon(pokeData);
        }
        fetchPokemon();

    }, []);


    return pokemon.map((poke) => {
        console.log(poke)
        return (
            <div key={poke.name}>
                <img src={poke.imgUrlNormal} />
                <img src={poke.imgUrlShiny} />
                <p>{poke.name}</p>
                <p>{poke.name} shiny</p>
                <hr />
            </div>
        )
    })


}

export default ClientSide
