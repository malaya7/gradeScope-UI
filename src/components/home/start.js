import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';

export default function Start(props) {
    const [a, setA] = React.useState(false);
    const [b, setB] = React.useState(false);
   const handleLoad = (e) => { 
      const v = e.target.value;
      setA(v)
    
    };
    const handleLoad2 = (e) => { 
        const v = e.target.value;
       if(v === '999' && a === 'malaya') {
           setB(v);   
       }
      };

    return (
       <div>
            <TextField
                  id="datetime-local"
                  onChange={handleLoad}
                  InputLabelProps={{
                      shrink: true,
                  }}
              />
              <TextField
                  id="datetime-local"
                  onChange={handleLoad2}
                  InputLabelProps={{
                      shrink: true,
                  }}
              />
              </div>
    )
}