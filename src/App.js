import React from 'react';
import { BrowserRouter as  Router, Routes, Route,} from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/QuizInstructions';
import Play from './components/Play';
import QuizSummary from './components/QuizSummary';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz-instructions' element={<QuizInstructions />} />
        <Route path='/play/' element={<Play />} />
        <Route path='/quiz-summary' element={<QuizSummary />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
