import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react'

import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import ShowEvents from './components/ShowEvents';
import CreateEvent from './components/CreateEvent';
import LoginPage from './components/LoginPage';


function App() {
  const [user, setUser] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  // const city = 'Lancaster'
  // const country = 'USA'
  // useEffect(() => {
  //   fetch(`https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`, {
  //     method: 'GET',
  //     headers: { 
  //       'X-API-KEY': 'EpE1KmfKqzmVA7Y6mvkAYg==ueFD6J6slQMt9sEW',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(r => r.json())
  //   .then(data => console.log(data))
  // })

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if (r.ok) {
        r.json().then(data => {
          setUser(data);
          setLoading(false);
        })
      } else {
        r.json().then(data => console.log(data.error))
      }
    })
  }, [])

  useEffect(() => {
    fetch('/events')
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            setEvents(data);
            setLoading(false);
          })
        } else {
          r.json().then(data => console.log(data.error))
        }
      })
  }, [])

  function onLogin(user) {
    setUser(user)
  }

  function handleNewEvent(newEvent) {
    setEvents([...events, newEvent])
  }

  
if (loading) return <h1>Loading...</h1>
  return (
    <div>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route exact path='/' element={<LandingPage user={user}/>} />
        <Route exact path='/login' element={<LoginPage onLogin={onLogin}/>} />
        <Route exact path='/events' element={<ShowEvents user={user} events={events} loading={loading}/>} />
        <Route exact path='/create' element={<CreateEvent user={user} handleNewEvent={handleNewEvent}/>} />
      </Routes>
    </div>
  );
}

export default App;
