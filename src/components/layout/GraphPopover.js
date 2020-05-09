import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    //setgraph(API_URLS.buildGraph(d))
    const formated = format(d);
    console.log(formated);
    setgraph(formated)
}
  const format = darray => {
    const f = [];  
    const res = darray.map(e => {
          const name = e.timestamp.split('T')[0];

          const sorted = e.data.sort((a, b) => a - b);
          const a = sorted.map(q=> ({name, uv:q}) );
          f.push(...a);
        return a;
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
        <BarChart width={730} height={250} data={graph}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
        :
        <Typography className={classes.typography}>The  of the Popover.</Typography>
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