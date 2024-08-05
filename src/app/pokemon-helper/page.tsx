"use client";
import { useState, useEffect } from 'react'
import Head from 'next/head';
import Container from '../../components/container';
import useFetch from '../../helpers/useFetch';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Autocomplete } from '@mui/material';

const item: SxProps<Theme> = {
    display: 'list-item',
    marginLeft: 4,
    padding: 0
};

export default function PokemonHelper() {
    // const { data, error } = useFetch('https://pokeapi.co/api/v2/pokemon/ditto')
    const { data: allPokemon, error: allPokemonError } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const { data: again, error: erroragain } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const [possiblePokemon, setPossiblePokemon] = useState([]);
    const [pokemonSelected, setPokemonSelected] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);

    useEffect(() => {
        if (allPokemon) {
            console.log(allPokemon)
            console.log('hi')
            console.log(allPokemon.results)
            setPossiblePokemon(allPokemon.results.map((pokemon: any) => pokemon.name))
            // for (let i = 0; i < allPokemon.length; i++) {
            //     let { data, error } = useFetch(`https://pokeapi.co/api/v2/type/${pokeType}`)
            //     console.log(data);
            // }

        }
    }, [allPokemon]);

    console.log(possiblePokemon)
    // console.log(data.types)
    // const pokeTypes = data.types;
    // for (let i = 0; i < pokeTypes.length; i++) {
    //     let { data, error } = useFetch(`https://pokeapi.co/api/v2/type/${pokeType}`)
    //     console.log(data);
    // }

    if (allPokemonError) return (<Container><div>Failed to load</div></Container>)
    if (!allPokemon) return (<Container><div>Loading...</div></Container>)

    return (
        <Container style={{ 'fontFamily': 'Courier New', 'padding': '5vw 10vw 5vw 10vw' }}>
            <Head><title>Pokemon</title></Head>
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            /> */}
        </Container>
    )
}
