import React, { useState, useEffect } from 'react';
import API_URLS from '../config/config';

function CoursesCard() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
      console.log("END-POINTS", API_URLS);
      async function fetchCourses() {
        console.log('fetching getCourses', API_URLS.getCourses);
        const res = await fetch(API_URLS.getCourses);

      }
    }, []);
    return (
      <React.Fragment>
       <div>
           COURSES CARD COMING SOON
       </div>
      </React.Fragment>
    );
  }
  
  export default CoursesCard;
  