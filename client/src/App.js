import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage';
import User from './pages/User/User';
import ReviseUser from './pages/User/ReviseUser';
import AdminUser from './pages/User/AdminUser';
import AllUsersPage from './pages/User/AllUsersPage';
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
import Event from './pages/News/Event';
import EventCreate from './pages/News/EventCreate';
import FAQ from './pages/CS/FAQ';
import OperationPolicy from './pages/CS/OperationPolicy';
import OauthLoadingPage from './pages/Login/OauthLoadingPage';
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
          <Route path='/users/profile/revise' element={<ReviseUser/>}/>
          <Route path='/admin-users/profile' element={<AdminUser/>}/>
          <Route path='/admin-users/all-users' element={<AllUsersPage/>}/>
          <Route path='/news/notice' element={<NewsPage/>}/>
          <Route path='/news/notice/create' element={<NewsCreate/>}/>
          <Route path='/community/forum' element={<CommunityPage/>}/>
          <Route path='/community/:id' element={<CommunityDetail/>}/>
          <Route path='/community/create' element={<CommunityCreate/>}/>
          <Route path='/goods' element={<GoodsPage/>}/>
          <Route path='/goods/create' element={<GoodsCreate/>}/>
          <Route path='/news/event' element={<Event/>}/>
          <Route path='/news/event/create' element={<EventCreate/>}/>
          <Route path='/cs/faq' element={<FAQ/>}/>
          <Route path='/cs/operationpolicy' element={<OperationPolicy/>}/>
          <Route path='/oauthloading' element={<OauthLoadingPage/>}/>

        </Routes>
    </div>  
  );
}

export default App;