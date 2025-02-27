"use client";
import { useState, useEffect } from 'react'
import { capitalizeWord } from '@/helpers/utils';
import Image from 'next/image'


function PokeInfo(props: { pokemonData: any }) {
    // const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
    // const [pokemonWeakness, setPokemonWeakness] = useState<string[]>([]);

    // useEffect(() => {
    //     if (props.pokemonData) {
    //         const selectedTypes: string[] = []
    //         props.pokemonData.types.map((type: any) => {
    //             selectedTypes.push(capitalizeWord(type.type.name))
    //         })

    //         setPokemonTypes(selectedTypes)
    //         setPokemonWeakness([])
    //     }
    // }, [props.pokemonData]);


    // useEffect(() => {
    //    console.log("weakness changed");
    //    console.log(pokemonWeakness)
    // }, [pokemonWeakness]);

    // const settingPokeWeakness = (weaknesses: string[]) => {
    //     console.log("inside the settingpokeweakness")
    //     setPokemonWeakness(weaknesses)
    // }

    // Format name to be capitalized
    const formatName = (name: string) => {
        return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Image and Number */}
              <div className="flex flex-col items-center">
                <div className="relative w-full h-48 md:h-64">
                    {props.pokemonData && (
                        <Image
                        src={props.pokemonData.sprites.other['official-artwork'].front_default || 
                            props.pokemonData.sprites.front_default}
                        alt={props.pokemonData.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                        /> )}
                </div>
                {props.pokemonData && (
                <span className="mt-4 bg-blue-700 text-white px-3 py-1 rounded-full font-bold">
                  #{String(props.pokemonData.id).padStart(3, '0')}
                </span>
                )}
              </div>

              {/* Middle and Right Column - Details */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {formatName(props.pokemonData.name)}
                </h2>

                {/* Types */}
                <div>
                  <h3 className="font-semibold mb-1 text-black">Types</h3>
                  <div className="flex gap-2">
                    {props.pokemonData.types.map((typeInfo: any, index: number) => {
                      const type = typeInfo.type.name;
                      const typeColors = {
                        normal: 'bg-[#A8A878]',
                        fire: 'bg-[#F08030]',
                        water: 'bg-[#6890F0]',
                        electric: 'bg-[#F8D030]',
                        grass: 'bg-[#78C850]',
                        ice: 'bg-[#98D8D8]',
                        fighting: 'bg-[#C03028]',
                        poison: 'bg-[#A040A0]',
                        ground: 'bg-[#E0C068]',
                        flying: 'bg-[#A890F0]',
                        psychic: 'bg-[#F85888]',
                        bug: 'bg-[#A8B820]',
                        rock: 'bg-[#B8A038]',
                        ghost: 'bg-[#705898]',
                        dragon: 'bg-[#7038F8]',
                        dark: 'bg-[#705848]',
                        steel: 'bg-[#B8B8D0]',
                        fairy: 'bg-[#EE99AC]',
                      };
                      return (
                        <span 
                          key={index} 
                          className={`${typeColors[type] || 'bg-gray-500'} text-white px-3 py-1 rounded-full capitalize`}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Physical Characteristics */}
                <div className="grid grid-cols-2 gap-4 text-black">
                  <div>
                    <h3 className="font-semibold mb-1">Height</h3>
                    <p>{(props.pokemonData.height / 10).toFixed(1)} m</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Weight</h3>
                    <p>{(props.pokemonData.weight / 10).toFixed(1)} kg</p>
                  </div>
                </div>

                {/* Abilities */}
                <div>
                  <h3 className="font-semibold mb-1 text-black">Abilities</h3>
                  <p className='text-black'>
                    {props.pokemonData.abilities
                      .map((a: any) => formatName(a.ability.name))
                      .join(', ')}
                  </p>
                </div>

                {/* Stats */}
                <div className='text-black'>
                  <h3 className="font-semibold mb-2">Base Stats</h3>
                  <div className="space-y-2">
                    {props.pokemonData.stats.map((statInfo: any, index: number) => {
                      const statName = statInfo.stat.name.replace('-', ' ');
                      const statValue = statInfo.base_stat;
                      const percentage = Math.min(statValue / 255 * 100, 100);
                      
                      let barColor;
                      if (percentage < 30) barColor = 'bg-red-500';
                      else if (percentage < 60) barColor = 'bg-yellow-500';
                      else barColor = 'bg-green-500';

                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm capitalize">
                            <span>{statName}</span>
                            <span>{statValue}</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full">
                            <div 
                              className={`h-full ${barColor} rounded-full`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div> 
            </div>
    )


}

export default PokeInfo;