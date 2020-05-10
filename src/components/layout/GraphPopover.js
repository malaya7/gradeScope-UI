import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';

import {
  BarChart, ScatterChart, Scatter, Bar, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend,
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
  const [data01, setg] = React.useState(false);

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
    if (!d) {
      alert("No Data were Found! did you scrape?");
      handleClose();
      return
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
      const name = e.timestamp.replace("T", " - ").substring(0, e.timestamp.length - 6)
      const sorted = e.data.sort((a, b) => a - b);
      // const a = sorted.map(q => ({ name, uv: q }));

      const max = sorted[sorted.length - 1];
      let prev = 0;
      x.push({ name, sep: 50 });
      for (let i = 5; i <= max; i += 5) {
        x.push({ name, grades: sorted.filter(x => x >= prev && x < i).length });
        prev = i;
      }
      x.push({ name, grades: sorted.filter(x => x === max).length });
      f.push(...x);
    });
    const makeSens = []
    const data01 = darray.map(e => {
      console.log(e)
      const name = e.timestamp.substring(5, e.timestamp.length - 8)

      const sorted = e.data.sort((a, b) => a - b);
      
      const counts = {};
      Array.prototype.forEach.call( sorted, num => (counts[num] = counts[num] ? counts[num] + 1 : 1));
      const ok = sorted.map(r => ({name, sum: counts[r], score: r}));
      makeSens.push(...ok);
  });
  setg(makeSens);
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
console.log(data01)
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
        <React.Fragment>
          <Box m={2} p={1}>
            <BarChart width={990} height={550} data={graph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sep" fill="#8884d8" />
              <Bar dataKey="grades"  name="Number Of students" fill="#82ca9d" />
            </BarChart>
          </Box>
          <Box m={2} p={1}>
            <ScatterChart width={830} height={550}
              margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" name="time" />
              <ZAxis dataKey="sum" name="Number of Students:" />
              <YAxis dataKey="score" range={[0, 100]} name="Points" unit="" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name={props.courseInfo.Name} data={data01} fill="#82ca9d" />
            </ScatterChart>
          </Box>
        </React.Fragment>
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