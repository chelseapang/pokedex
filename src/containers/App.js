import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    const fetchPokemonList = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');
            const data = await response.json();
            const pokemonDetailsPromises = data.results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return {
                    name: pokemon.name,
                    imageUrl: pokemonData.sprites.front_default,
                };
            });
            const pokemonDetails = await Promise.all(pokemonDetailsPromises);
            setPokemonList(pokemonDetails);
        } catch (error) {
            console.error('Error fetching Pokemon list:', error);
        }
    };

    useEffect(() => {
        fetchPokemonList();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredPokemon = pokemonList.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return (!pokemonList.length) ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>Pokedex</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList cards={filteredPokemon} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

export default App;
