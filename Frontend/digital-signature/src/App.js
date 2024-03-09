import { Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/home/LandingPage';
import SignIn from './pages/sign_in/SignIn';
import SignUp from './pages/sign_up/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/sign_in' element={<SignIn />} />
          <Route path='/sign_up' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
