// App.js
import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import Pagination from '../components/Pagination'; 
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  const fetchPokemonList = async (page) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
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
      setTotalPages(Math.ceil(data.count / 20)); 
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [currentPage]);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredPokemon = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return (
    <div className='tc'>
      <h1 className='f1'>Pokedex</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList cards={filteredPokemon} />
        </ErrorBoundary>
      </Scroll>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
