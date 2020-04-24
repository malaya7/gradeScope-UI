import React from 'react';
import Appbar from './components/layout/Appbar';
import CoursesCard from './components/Courses';

function App() {

  return (
    <React.Fragment>
      <Appbar />
      <CoursesCard/>
    </React.Fragment>
  );
}

export default App;
