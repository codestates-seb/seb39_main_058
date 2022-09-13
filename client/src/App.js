import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage';
import User from './pages/User/User';

function App() {
  
  const [welcome, setWelcome] = useState();

  return (
    <div className="App">
      
      <Routes>
        <Route path='/'/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signin' element={<SignupPage/>}/>
        <Route path='/users/:id' element={<User/>}/>
        <Route/>
      </Routes>
    </div>  
  );
}

export default App;
