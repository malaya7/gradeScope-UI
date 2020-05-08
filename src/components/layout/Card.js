import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import jwong from '../../static/images/pic.PNG'
import minion from '../../static/images/minion.jpg'
import API_URLS from '../../config/config';

/* import Button from '@material-ui/core/Button'; */

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
});


export default function MediaCard(props) {
  const classes = useStyles();

  const handleClick = async () => {
    const courseId = props.id;
    const url = `${API_URLS.base}${courseId}/assignments`;
    const res = await fetch(url);
    if(res.status !== 200) {
      alert("Item Not Found!")
    } else {
      const hwArray = await res.json();
      props.updateHW(hwArray);
    }
    
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.media}
          image={props.name[0] === 'G' ? minion : jwong}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
         {/*  <Typography variant="body2" color="textSecondary" component="p">
            ID: {props.id}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="large" color="secondary" onClick={() => handleClick(props.id)}>
          List Assignments
        </Button> */}
        {/*
        <Button size="small" color="primary">
          Learn More
        </Button> */}

      </CardActions>
    </Card>
  );
}