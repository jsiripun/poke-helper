"use client";
import { useState, useEffect } from 'react'
import useFetch from '../helpers/useFetch';
import { capitalizeWord } from '@/helpers/utils';


function PokeType(props: { typeName: string, pokeWeakness: string[], setPokeWeakness: any }) {
    const { data: selectedTypeInfo, error: selectedTypeInfoError } = useFetch(`https://pokeapi.co/api/v2/type/${props.typeName.toLowerCase()}/`);
    const [pokemonLocalWeakness, setPokemonLocalWeakness] = useState<string[]>([]);

    useEffect(() => {
        if (selectedTypeInfo) {
            setPokemonLocalWeakness(props.pokeWeakness);

            console.log(props.typeName);
            const selectedTypes: string[] = [...props.pokeWeakness];
            console.log(selectedTypes);
            console.log(selectedTypeInfo);
            selectedTypeInfo.damage_relations.double_damage_from.map((type: any) => {
                const typeCapitalized = capitalizeWord(type.name)
                selectedTypes.includes(typeCapitalized) ? null : selectedTypes.push(typeCapitalized)
            })

            console.log(selectedTypes);
            props.setPokeWeakness(selectedTypes)
            setPokemonLocalWeakness(selectedTypes)
        }
    }, [selectedTypeInfo]);

    return (
    // <div>
    //     {props.pokeWeakness.map(weakness => {
    //         return (
    //             <div key={weakness}>
    //                 <p>{weakness}</p>
    //             </div>
    //         )
    //     })}
    //     </div>
    null
        );


}

export default PokeType;