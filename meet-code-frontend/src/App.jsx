import React from 'react'
import './App.css'
import Home from './components/home.jsx';
import Problems from './components/problems.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import IndividualProblem from './components/IndividualProblem';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path='/problems/individual/:id' element={<IndividualProblem />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
