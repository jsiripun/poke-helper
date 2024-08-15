"use client";
import { useState, useEffect } from 'react'
import useFetch from '../helpers/useFetch';
import PokeType from './PokeType';
import { capitalizeWord } from '@/helpers/utils';


function PokeInfo(props: { pokemonName: string }) {
    const { data: selectedPokemonInfo, error: selectedPokemonInfoError } = useFetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonName.toLowerCase()}/`);
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

    useEffect(() => {
        if (selectedPokemonInfo) {
            const selectedTypes: string[] = []
            selectedPokemonInfo.types.map((type: any) => {
                selectedTypes.push(capitalizeWord(type.type.name))
            })

            setPokemonTypes(selectedTypes)
        }
    }, [selectedPokemonInfo]);


    return (<div>
        <p>{props.pokemonName}</p>
        {pokemonTypes.map(type => {
            return (
                <div>
                    <p>{type}</p>
                    <PokeType typeName={type} />
                </div>
            )
        })}
    </div>)


}

export default PokeInfo;