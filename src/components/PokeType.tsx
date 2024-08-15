"use client";
import { useState, useEffect } from 'react'
import useFetch from '../helpers/useFetch';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Autocomplete, TextField } from '@mui/material';


function PokeType(props: { typeName: string }) {
    console.log(props)
    const { data: selectedTypeInfo, error: selectedTypeInfoError } = useFetch(`https://pokeapi.co/api/v2/type/${props.typeName.toLowerCase()}/`);
    const [pokemonWeaknessTypes, setPokemonWeaknessTypes] = useState<string[]>([]);

    console.log(selectedTypeInfo);

    useEffect(() => {
        if (selectedTypeInfo) {
            const selectedTypes: string[] = []
            selectedTypeInfo.damage_relations.map((type: any) => {
                selectedTypes.push(type)
            })

            setPokemonWeaknessTypes(selectedTypes)
        }
    }, [selectedTypeInfo]);

    // console.log(selectedTypeInfo)
    // console.log(pokemonWeaknessTypes)

    return (<div>
        <p></p>
    </div>)


}

export default PokeType;