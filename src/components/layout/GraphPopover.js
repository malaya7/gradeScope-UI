import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import API_URLS from '../../config/config';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [graph, setgraph] = React.useState(false);

  const handleSend = async (e) => {
    const info = props.courseInfo.Link;
    const url = `${API_URLS.base}/show/${info}`;

    const res = await fetch(url);
    if (res.status !== 200) {
      alert("Server Error, Please Try Again later!");
      return;
    }
    const d = await res.json()
    console.log(d)
    if(!d) {
      alert("No Data were Found! did you scrape?");
      handleClose();
    }
    //setgraph(API_URLS.buildGraph(d))
    const formated = format(d);
    console.log(formated);
    setgraph(formated)
  }
  const format = darray => {
   
    const f = [];
    const x = [];
    darray.map(e => {
      const name = e.timestamp.split('T')[0];
      const sorted = e.data.sort((a, b) => a - b);
     // const a = sorted.map(q => ({ name, uv: q }));
      
      const max = sorted[sorted.length - 1]; 
      let prev = 0;
      x.push({name, sep:50});
      for (let i = 5; i <= max; i += 5) {
        x.push({name, grades: sorted.filter(x => x >= prev && x < i).length});
        prev = i;
      }
      x.push({name, grades: sorted.filter(x => x === max).length});
      f.push(...x);
    });
    return f;  
  };

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  handleSend();
};

const handleClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

console.log(graph)
return (
  <div>
    <Button aria-describedby={id} variant="outlined" color="primary" onClick={handleClick}>
      Show
      </Button>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      {graph ?
        <Box m={2} p={1}>
          <BarChart width={990} height={550} data={graph}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sep" fill="#8884d8" />
             <Bar dataKey="grades" fill="#82ca9d" />
          </BarChart>
        </Box>
        :
        <Typography className={classes.typography}>Loading...</Typography>
      }
    </Popover>
  </div>
);
}

/*
 const [graph, setgraph] = React.useState(false);

  const handleSend = async (e) => {
    const info = props.courseInfo.Link;
    const url = `${API_URLS.base}/show/${info}`;

    const res = await fetch(url);
    if (res.status !== 200) {
        alert("Server Error, Please Try Again later!");
        return;
    }
    const d = await res.json()
    console.log(d)
    setgraph(API_URLS.buildGraph(d))
}


*/