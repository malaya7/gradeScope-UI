import React, { useState, useEffect } from 'react';
import Card from './layout/Card';

import API_URLS from '../config/config';

function CoursesCard() {
    const [courseData, setCourseData] = useState([]);
    const [hws, setHws] = useState([]);

    const handleHWs = newValue => {
      setHws(newValue);
    }

    useEffect(() => {
      const fetchCourses = async() => {
          console.log('fetching getCourses', API_URLS.getCourses);
          const res = await fetch(API_URLS.getCourses);
          const coursesArray = await res.json();
          setCourseData(coursesArray);
      }
      fetchCourses();

    }, []);
  
    return (
      <React.Fragment>
      {courseData.map(item => (
         <Card key={item.name} name={item.name} id={item.link} updateHW={handleHWs} />
      ))}
      {hws.Assignments && hws.Assignments.map(item => (
         <Card key={item.Name} name={item.Name} id={item.Link} />
      ))}
      </React.Fragment>
    );
  }
  
  export default CoursesCard;
  