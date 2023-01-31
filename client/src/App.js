import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import ShowEvents from './components/ShowEvents';




function App() {

  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('/events')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])


  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path='/events' element={<ShowEvents events={events}/>} />
      </Routes>
    </div>
  );
}

export default App;
