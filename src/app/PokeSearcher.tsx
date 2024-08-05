"use client";
import { useState, useEffect } from 'react'
import Head from 'next/head';
import Container from '../components/container';
import useFetch from '../helpers/useFetch';
import { capitalizeWord } from '@/helpers/utils';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Autocomplete, TextField } from '@mui/material';

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "Courier New",
    paddingRight: '10vw'
};


function PokeSearcher() {
    // const { data, error } = useFetch('https://pokeapi.co/api/v2/pokemon/ditto')
    const { data: allPokemon, error: allPokemonError } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const { data: again, error: erroragain } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const [possiblePokemon, setPossiblePokemon] = useState<string[]>([]);
    const [pokemonSelected, setPokemonSelected] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);

    useEffect(() => {
        if (allPokemon) {
            const allUniquePokemon: string[] = []
            allPokemon.results.map((pokemon: any) => {
                if (allUniquePokemon.filter(poke => pokemon.name.includes(poke)).length == 0) {
                    allUniquePokemon.push(capitalizeWord(pokemon.name))
                }
            })

            setPossiblePokemon(allUniquePokemon)
        }
    }, [allPokemon]);

    if (allPokemonError) return (<Container><div>Failed to load</div></Container>)
    if (!allPokemon) return (<Container><div>Loading...</div></Container>)

    return (
        <Container style={{ 'fontFamily': 'Courier New', 'padding': '5vw 10vw 5vw 10vw' }}>
            <Head><title>Pokemon</title></Head>
            <Autocomplete
                disablePortal
                id="pokemon-input"
                options={possiblePokemon}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Pokemon" />}
            />
        </Container>
    )
}

export default PokeSearcher;