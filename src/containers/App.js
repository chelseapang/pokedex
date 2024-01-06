import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
    const [robots, setRobots] = useState([])
    const [pokemonList, setPokemonList] = useState([]);
    const [searchfield, setSearchfield] = useState('')
    useEffect(() => {
        const fetchPokemonList = async () => {
          try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');
            const data = await response.json();
            console.log(data)
            const names = data.results.map((pokemon) => pokemon.name);
            setPokemonList(names);
          } catch (error) {
            console.error('Error fetching Pokemon list:', error);
          }
        };
    
        fetchPokemonList();
      }, []); // Empty dependency array means this effect runs once when the component mounts
    

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
    }, [])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return (!robots.length) ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

export default App;