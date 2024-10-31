import React from 'react';
import { BrowserRouter as  Router, Routes, Route,} from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/QuizInstructions';
import Play from './components/Play';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz-instructions' element={<QuizInstructions />} />
        <Route path='/play/' element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
