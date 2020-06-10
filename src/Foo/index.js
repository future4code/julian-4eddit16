import React, { useState } from 'react';

const Foo = () => {
    const [up, setUp] = useState(true);
    const [dw, setDw] = useState(true);

    
    const choice = (a, button, bla) => {
        const choice = a
        document.getElementById(`${button}`).disabled = bla;
        
    };

    return (
        <div>
            
            <button id='upVote' onClick={() => choice(+1, 'upVote', up)}>+</button>
            <button id='downVote' onClick={() => choice(- 1, 'downVote', dw)}>-</button>
        </div>
    );
};

export default Foo;