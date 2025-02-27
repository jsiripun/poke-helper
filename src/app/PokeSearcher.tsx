"use client";
import { useState, useEffect } from 'react'
import Container from '../components/container';
import useFetch from '../helpers/useFetch';
import { capitalizeWord } from '@/helpers/utils';
import { Autocomplete, TextField, Grid, CircularProgress } from '@mui/material';
import PokeInfo from '@/components/PokeInfo';


export default function PokeSearcher() {
  const [pokemonInput, setPokemonInput] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { data: allPokemon, error: allPokemonError } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
  const [possiblePokemon, setPossiblePokemon] = useState<string[]>([]);


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

    const newPokemonSelected = (event: any) => {
        setPokemonInput(event.target.innerText);
    }

    if (allPokemonError) return (<Container><div>Failed to load</div></Container>)
    if (!allPokemon) return (<Container><div>Loading...</div></Container>)


  const searchPokemon = async () => {
    const input = pokemonInput.toLowerCase().trim()
    if (!input) return

    setLoading(true)
    setError(null)
    setPokemon(null)

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`)
      
      if (!response.ok) {
        throw new Error('Pokémon not found')
      }
      
      const data = await response.json()
      console.log(data)
      setPokemon(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-red-600 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-400 rounded-full border-4 border-white shadow-inner"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Pokédex</h1>
        </div>

        {/* Search Section */}
        <div className="bg-white m-4 p-4 rounded-xl">
          <div className="flex gap-2">
          {possiblePokemon ? <Autocomplete
                disablePortal
                id="pokemon-input"
                options={possiblePokemon}
                className="flex-1 p-2 border-2 bg-gray border-5 rounded-md"
                renderInput={(params) => <TextField {...params} label="Pokemon" />}
                onChange={newPokemonSelected}
            /> : <CircularProgress />}
            <button
              onClick={searchPokemon}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition duration-200 flex items-center"
            >
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Display Section */}
        <div className="bg-white m-4 p-5 rounded-xl min-h-[400px]">
        {pokemon && !loading ? (
            <PokeInfo pokemonData={pokemon} />)
            // <div className='text-black'>{pokemonSelected}</div>)
             : 
            loading ? <CircularProgress /> :
             <div className="text-center text-gray-600">
              <p>Enter a Pokémon name to see its information</p>
            </div>
            }
        </div>
      </div>
    </main>
  )
}