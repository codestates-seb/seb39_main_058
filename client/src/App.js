import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage';
import User from './pages/User/User';
// import MainPage from './pages/Main/MainPage';
import Welcome from './components/Welcome';
import NavBar from './components/NavBar';

function App() {
  
  const [welcome, setWelcome] = useState(sessionStorage.getItem('welcome'));
  
  
  useEffect(() => {
    sessionStorage.setItem('welcome', welcome)
  }, [welcome])

  const clear = () => {
    setWelcome(undefined)
  }

  useEffect(() => {
      setTimeout(clear, 4000)
  },[])

  const MainPage = lazy(() => import('./pages/Main/MainPage'))

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {welcome === null ? undefined :<NavBar welcome={welcome} />}
        <Routes>
          <Route path='/' element={welcome === null ? <Welcome/> : <MainPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/users/:id' element={<User/>}/>
          <Route/>
        </Routes>
      </Suspense>
    </div>  
  );
}

export default App;
