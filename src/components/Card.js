import React from 'react';
import './Card.css';

const Card = ({ name, imageUrl }) => {
    return (
        <div className='card tc bg-washed-green dib br3 pa3 ma2 grow bw2 shadow-5'>
            <img alt='pokemon' src={imageUrl} />
            <div>
                <h2>{name}</h2>
            </div>
        </div>
    );
}

export default Card;
