import axios from "axios";
import { useState, useEffect } from 'react';

const url = "https://pokeapi.co/api/v2/pokemon?limit=151"

function ClientSide() {
    const [pokemon, setPokemon] = useState([]);
    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await axios.get(url);

            const promises = response.data.results.map(result => {
                return (axios.get(result.url));
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
            <div>
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
