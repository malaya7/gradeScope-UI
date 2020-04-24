import React, { useState, useEffect } from 'react';
import Card from './Card';

import API_URLS from '../config/config';

function CoursesCard() {
    const [courseData, setCourseData] = useState([]);

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
         <Card key={item.name} name={item.name} id={item.link} />
      ))}
      </React.Fragment>
    );
  }
  
  export default CoursesCard;
  