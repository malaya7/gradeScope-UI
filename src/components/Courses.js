import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from './layout/list';
import Table from "./layout/Table";
import API_URLS from '../config/config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
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

  const [currentCourse, setCurrentCourse] = useState([]);
  
  const handleHWs = newValue => {
    setHws(newValue);
  }

  useEffect(() => {
    const fetchCourses = async () => {
      // console.log('fetching getCourses', API_URLS.getCourses);
      const res = await fetch(API_URLS.getCourses);
      const coursesArray = await res.json();
      setCourseData(coursesArray);
      setCurrentCourse(coursesArray[0].name)
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
  // console.log(currentCourse)
  return (
    <React.Fragment>
      <List data={courseData} updateHW={handleHWs} currIndex={setCurrentCourse} />

      {hw.Assignments && <Table key={hw} cname={currentCourse} className={classes.paper} item={hw}/>}  
 
    </React.Fragment>
  );
}

export default Courses;
