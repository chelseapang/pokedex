import React from 'react';
import Card from './Card';


const CardList = ({ names }) => {
    console.log(names)
    const cardComponent = names.map((name, i) => {
        return <Card 
        key={i} 
        // id={robots[i].id} 
        name={name} 
        // email={robots[i].email} 
        />

    })
    return (
        <div>
            {cardComponent}
        </div>
    );
}

export default CardList;