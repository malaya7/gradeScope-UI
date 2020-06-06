import React, {Component } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

import {
  BarChart, ScatterChart, Scatter, Label, Bar, LabelList, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import API_URLS from '../../config/config';

const useStyles =  theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  marginAutoContainer: {
    width: 500,
    height: 80,
    display: 'flex',
    backgroundColor: 'gold',
  },
  marginAutoItem: {
    margin: 'auto'
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
});

class SimplePopover extends Component {  
    state = {
        anchorEl:null,
        imgUrl: "Not Exits",
        graph: false,
        data01: false,
        index:0,
        stks:["#82ca9d", "#8884d8", "#81c2ea", "#008080", "#e40000", "#ec7426", "#88df86",
              "#FF00FF", "#ffff00", "#800080", "#800000", "#000000", "#008080", "#008080","#008080",
              "#008080" ,"#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080",
              "#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080",
              "#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080",
              "#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080",
              "#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080",
              "#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080","#008080"]
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

      x.push({sco:0, name, grades: sorted.filter(x => x === 0).length });
      for (let i = 5; i <= max; i += 5) {
        x.push({sco:`${prev}-${i-1}`, name, grades: sorted.filter(x => x >= prev && x < i).length });
        prev = i;
      }
      x.push({ sco: max, name, grades: sorted.filter(x => x === max).length });
      f.push(...x);

    return f;
  };

 async componentDidMount(){
    setInterval(this.updateChart, 5000);
    const linksplit =  this.props.courseInfo.Link.split('/');
    let imgLink = `https://ics53assest.s3-us-west-1.amazonaws.com/${linksplit[2]}_${linksplit[4]}.gif`;
    this.setState({imgUrl: imgLink});
    const req = await fetch(imgLink);
    console.log(req)
    if(req.status === 403) {
      this.setState({imgUrl: "S3 Image Link Not Found!"});
    }
}

updateChart = () => {
  const d = this.state.graph
  let index = this.state.index;
 
  if(d && d.length) {
    const formated = this.format(d, index);
    index++ ;
    index = (index >= d.length) ? 0 : index;
    this.setState({index, data01: formated})
  }
  
};
   handleClick = async (event) => {
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
  console.log(this.props)

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
             <Box m="auto">
             <Typography variant="h5" color="secondary">
               {this.state.imgUrl}
              </Typography>
            </Box>
            <Box m="auto">
            <Typography variant="h5" color="primary">
              Date  {graph[this.state.index].timestamp.toLocaleString('en-US').split("T")[0]}
             </Typography>
             <Typography variant="h5" color="primary">
              Time  {graph[this.state.index].timestamp.toLocaleString('en-US').split("T")[1]}
             </Typography>
             <Typography variant="h5"
                         color="primary">
              Mean {graph[this.state.index].mean}
            </Typography>
            <Typography variant="h5"
                         color="primary">
              Highest Score {graph[this.state.index].max}
            </Typography>
            <Typography variant="caption"
                         color="primary">
              DataSet: {this.state.index} <br/>
              Number DataSets {graph.length}
            </Typography>
             </Box>
            <Box m={3} p={1}>
              <BarChart width={990} height={550} data={moreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sco"> 
                </XAxis>
                <YAxis  label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }}/> 
                <Tooltip />
                <Legend/>
                <Bar 
                dataKey="grades" 
                name="# Students" 
                stroke="#FFFF00"  
                type="monotone" 
                fill={this.state.stks[this.state.index]} 
                >
                 <LabelList dataKey="grades" position="top" /> 
                </Bar>
              </BarChart>
            </Box>
          </React.Fragment>
          : <div>
          {this.state.imgUrl}
          <Typography className={classes.typography}>Loading...</Typography>
          </div>
        }
      </Popover>
    </div>
  ); 

      }
}

export default withStyles(useStyles)(SimplePopover);