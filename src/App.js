import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Home }   from './components/Home';
import { CreateAc } from './components/CreateAc';
import { Login } from './components/Login';
import { UserData } from './components/UserData';
import { AddData } from './components/AddData';
import { EditData } from './components/EditData';
import { ViewData } from './components/ViewData';
import { Alert } from './components/Alert';
import UserState from './context/users/UserState';

function App() {
  

  
  return (
    <div className='container'>
      <Router>
      <UserState>
      
        <Alert />
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/create" element={ <CreateAc/> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/userdata" element={ <UserData  />} />
          <Route exact path="/adddata" element={ <AddData /> } />
          <Route exact path="/editdata/:id" element={ <EditData /> } />
          <Route exact path="/viewdata/:id" element={ <ViewData /> } />

        </Routes>
      

      </UserState>
      </Router>
    </div>
  );
}

export default App;
