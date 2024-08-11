"use client";
import { useState, useEffect } from 'react'
import useFetch from '../helpers/useFetch';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Autocomplete, TextField } from '@mui/material';


function PokeType(props: {typeName: string}) {
    console.log(props)
    const { data: selectedType, error: selectedTypeError } = useFetch(`https://pokeapi.co/api/v2/type/${props.typeName.toLowerCase()}/`);
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

    // useEffect(() => {
    //     if (selectedPokemonInfo) {
    //         const selectedTypes: string[] = []
    //         selectedPokemonInfo.types.map((type: any) => {
    //            selectedTypes.push(type)
    //         })

    //         setPokemonTypes(selectedTypes)
    //     }
    // }, [selectedPokemonInfo]);

    // console.log(selectedPokemonInfo)
    console.log(pokemonTypes)

    return (<div>
        <p></p>
    </div>)


}

export default PokeType;