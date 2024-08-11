"use client";
import { useState, useEffect } from 'react'
import Head from 'next/head';
import Container from '../components/container';
import useFetch from '../helpers/useFetch';
import { capitalizeWord } from '@/helpers/utils';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Autocomplete, TextField } from '@mui/material';


function PokeInfo(props: {pokemonName: string}) {
    console.log(props)
    const { data: selectedPokemonInfo, error: selectedPokemonInfoError } = useFetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonName.toLowerCase()}/`);
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

    useEffect(() => {
        if (selectedPokemonInfo) {
            const selectedTypes: string[] = []
            selectedPokemonInfo.types.map((type: any) => {
               selectedTypes.push(type)
            })

            setPokemonTypes(selectedTypes)
        }
    }, [selectedPokemonInfo]);

    console.log(selectedPokemonInfo)
    console.log(pokemonTypes)

    return (<div>
        <p></p>
    </div>)


}

export default PokeInfo;