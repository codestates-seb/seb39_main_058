import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage';
import User from './pages/User/User';
import KakaoMap from './pages/Main/MainPage';
import Welcome from './components/Welcome';
import NavBar from './components/NavBar';
import NewsPage from './pages/News/NewsPage';
import NewsCreate from './pages/News/NewsCreate';
import CommunityPage from './pages/Community/CommunityPage';
import CommunityDetail from './pages/Community/CommunityDetail';
import CommunityCreate from './pages/Community/CommunityCreate';
import GoodsPage from './pages/Goods/GoodsPage';
import GoodsCreate from './pages/Goods/GoodsCreate';

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

  return (
    <div>
        {welcome === null ? undefined :<NavBar welcome={welcome} />}
        <Routes>
          <Route path='/' element={welcome === null ? <Welcome/> : <KakaoMap/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/users/profile' element={<User/>}/>
          <Route path='/news/notice' element={<NewsPage/>}/>
          <Route path='/news/notice/create' element={<NewsCreate/>}/>
          <Route path='/community/forum' element={<CommunityPage/>}/>
          <Route path='/community/:id' element={<CommunityDetail/>}/>
          <Route path='/community/create' element={<CommunityCreate/>}/>
          <Route path='/goods' element={<GoodsPage/>}/>
          <Route path='/goods/create' element={<GoodsCreate/>}/>
        

        </Routes>
    </div>  
  );
}

export default App;