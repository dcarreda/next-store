import axios from "axios";
import { useState, useEffect } from 'react';

const url = "https://pokeapi.co/api/v2/pokemon?limit=151"
const headers = {
    "Cache-Control": "no-cache",
}
function StaticSide(props) {


    return props.pokemon.map((poke) => {
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

export const getStaticProps = async () => {

    const response = await axios.get(url, { headers });

    const promises = response.data.results.map(result => {
        return (axios.get(result.url, { headers }));
    })

    const responses = await Promise.all(promises);
    const pokeData = responses.map((r) => {
        return {
            name: r.data.name,
            imgUrlNormal: r.data.sprites.front_default,
            imgUrlShiny: r.data.sprites.front_shiny

        }
    })

    return {
        props: {
            pokemon: pokeData,
        }
    }
}

export default StaticSide
