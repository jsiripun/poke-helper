"use client";
import { useState, useEffect } from 'react'
import useFetch from '../helpers/useFetch';
import PokeType from './PokeType';
import { capitalizeWord } from '@/helpers/utils';


function PokeInfo(props: { pokemonName: string }) {
    const { data: selectedPokemonInfo, error: selectedPokemonInfoError } = useFetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonName.toLowerCase()}/`);
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
    const [pokemonWeakness, setPokemonWeakness] = useState<string[]>([]);

    useEffect(() => {
        if (selectedPokemonInfo) {
            const selectedTypes: string[] = []
            selectedPokemonInfo.types.map((type: any) => {
                selectedTypes.push(capitalizeWord(type.type.name))
            })

            setPokemonTypes(selectedTypes)
            console.log("resetting weaknesses")
            setPokemonWeakness([])
        }
    }, [selectedPokemonInfo]);


    useEffect(() => {
       console.log("weakness changed");
       console.log(pokemonWeakness)
    }, [pokemonWeakness]);

    const settingPokeWeakness = (weaknesses: string[]) => {
        console.log("inside the settingpokeweakness")
        setPokemonWeakness(weaknesses)
    }

    console.log(pokemonWeakness)
    return (
    <div>
        <p>{props.pokemonName}</p>
        <p>Selected Types:</p>
        {pokemonTypes.map(type => {
            return ( <div>
                    <p>{type}</p>
                    <PokeType pokeWeakness={pokemonWeakness} setPokeWeakness={settingPokeWeakness} typeName={type} />
                </div>
            )
        })}
        {/* {pokemonTypes.map(type => {
            return (
                    <p>{type}</p>
            )
        })}  */}
        <br/>
        <p>Weaknesses:</p>
        {/* {pokemonWeakness.map(type => {
            return (
                <PokeType pokeWeakness={pokemonWeakness} setPokeWeakness={setPokemonWeakness} typeName={type} />
            )
        })} */}
        {pokemonWeakness.map(weakness => {
            return (<p>{weakness}</p>)
        })}

    </div>)


}

export default PokeInfo;