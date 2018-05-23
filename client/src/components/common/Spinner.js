import React from 'react';
import spinner from './spinner.gif';

//TO pass in the spinner src, simply pass the import (ln 2)
export default ()=>{
    return(
        <div>
            <img
                src={spinner}
                style={{
                    width: '200px',
                    margin: 'auto',
                    display: 'block'
                }}
                alt='Loading...'/>
        </div>
    )
}