import React, {Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

import {
  BarChart, ScatterChart, Scatter, Bar, LabelList, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import API_URLS from '../../config/config';

const useStyles =  theme => ({
  typography: {
    padding: theme.spacing(2),
  },
});

class SimplePopover extends Component {  
    state = {
        anchorEl:null,
        graph: false,
        data01: false,
        index:0,
  } 

  handleSend = async (e) => {
    const info = this.props.courseInfo.Link;
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
      this.handleClose();
      return
    }
    const formated = this.format(d);
    console.log(formated);
    this.setState({graph: d})
    this.setState({data01: formated})
  }
  format = (darray,i) => {
    // BAR
    const f = [];
    let ind = 0;
      if(i && i < darray.length){
        ind = i;
      }
      const e = darray[ind];
      console.log(e)
      const name = new Date(e.timestamp.toLocaleString()).toLocaleString('en-US')
      const sorted = e.data.sort((a, b) => a - b);


      // Bars
      const x = [];
      const max = sorted[sorted.length - 1];
      let prev = 0;
      x.push({ name, sep: 50 });
      x.push({ b: 0, name, grades: sorted.filter(x => x === 0).length });
      for (let i = 5; i <= max; i += 5) {
        x.push({ b: i, name, grades: sorted.filter(x => x >= prev && x < i).length });
        prev = i;
      }
      // x.push({ b:max, name, grades: sorted.filter(x => x === max).length });
      f.push(...x);

    return f;
  };

  componentDidMount(){
    setInterval(this.updateChart, 5000);
}

updateChart = () => {
  const d = this.state.graph
  let index = this.state.index;
 
  if(d && d.length) {
    if(index >= d.length) {
      index = 0;
    }   
    const formated = this.format(d, index);
    index++ ;
    this.setState({index, data01: formated})
  }
  
};

   handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
    this.handleSend();
  };

   handleClose = () => {
    this.setState({
      anchorEl:null,
      graph: false,
      data01: false,
      index:0,});
  };
  render() {
  const { classes } = this.props;

  const { anchorEl } = this.state;
  const open = Boolean(anchorEl);

  const graph = this.state.graph
  const moreData = this.state.data01;

  console.log(this.state)
  
  return (
    <div>
      <Button aria-owns={open ? 'simple-popper' : undefined}
              variant="outlined" color="primary" onClick={this.handleClick}>
        Show
      </Button>
      <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
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
              <BarChart width={990} height={550} data={moreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="sep" fill="#8884d8" /> */}
                <Bar dataKey="grades" name="Students" fill="#82ca9d">
                  {/*  <LabelList dataKey="b" position="top" /> */}
                </Bar>
                <Bar dataKey="b" name="Score" fill="#ff0074" />

              </BarChart>
            </Box>
            {/* <Box m={2} p={1}>
              <ScatterChart width={830} height={550}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" name="Time" />
                <ZAxis dataKey="sum" name="Number of Students" />
                <YAxis dataKey="score" range={[0, 100]} name="Points" unit="" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name={props.courseInfo.Name} data={data01} fill="#82ca9d" />
              </ScatterChart>
            </Box> */}
          </React.Fragment>
          :
          <Typography className={classes.typography}>Loading...</Typography>
        }
      </Popover>
    </div>
  );
      }
}

export default withStyles(useStyles)(SimplePopover);