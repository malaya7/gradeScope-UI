import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from './layout/Card';
import Table from "./layout/Table";
import API_URLS from '../config/config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Courses() {
  const classes = useStyles();
  const [courseData, setCourseData] = useState([]);
  const [hw, setHws] = useState([]);

  const handleHWs = newValue => {
    setHws(newValue);
  }

  useEffect(() => {
    const fetchCourses = async () => {
      console.log('fetching getCourses', API_URLS.getCourses);
      const res = await fetch(API_URLS.getCourses);
      const coursesArray = await res.json();
      setCourseData(coursesArray);
    }
    fetchCourses();

  }, []);

  return (
    <React.Fragment>
      <Grid container
        direction="row-reverse"
        justify="space-between"
        alignItems="stretch"
        spacing={5}>
           <Grid item xs={8}>
          {hw.Assignments && <Table className={classes.paper} item={hw}/>}
        </Grid>
        <Grid item xs={4}>
          {courseData.map(item => (
            <Card key={item.name} name={item.name} id={item.link} updateHW={handleHWs} />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Courses;
