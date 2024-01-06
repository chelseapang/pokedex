import React from 'react';

const Card = ({ name, imageUrl }) => {
    return (
        <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
            <img alt='pokemon' src={imageUrl} />
            <div>
                <h2>{name}</h2>
            </div>
        </div>
    );
}

export default Card;
