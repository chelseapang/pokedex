import React from 'react';
import Card from './Card';


const CardList = ({ cards }) => {
    console.log(cards)
    const cardComponent = cards.map((pokemon, i) => {
        return <Card 
        key={i} 
        name={pokemon.name} 
        imageUrl={pokemon.imageUrl}
        />

    })
    return (
        <div>
            {cardComponent}
        </div>
    );
}

export default CardList;