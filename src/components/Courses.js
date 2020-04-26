import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      return coursesArray || [];
    }
    const fetchAssighments = async () => {
      const d = await fetchCourses();
      const courseId = d[0].link;
      const url = `${API_URLS.base}${courseId}/assignments`;
      const res = await fetch(url);
      if(res.status !== 200) {
        alert("Click on Card to Display table")
      } else {
        const hwObj = await res.json();
        setHws(hwObj);
      }
      
    }
    fetchAssighments();
  }, []);
  // console.log(courseData)
  // console.log(hw)
  return (
    <React.Fragment>
      <Grid container
        direction="row-reverse"
        justify="space-between"
        alignItems="stretch"
        spacing={5}>
           <Grid item xs={8}>
          {hw.Assignments && <Table key={hw} className={classes.paper} item={hw}/>}
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
