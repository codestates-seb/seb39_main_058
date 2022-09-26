import {React ,useState } from 'react'
import styled from "styled-components";
import {Link, useLocation, useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const navigate=useNavigate();
  const location=useLocation();

  const [id, setId] = useState("");
  const [clickId, setClickId] = useState(false);

  const [password, setPassword] = useState("");
  const [clickPassword, setClickPassword] = useState(false);

  const [alertId,setAlertId]=useState('');
  const [alertPwd,setAlertPwd]=useState('');

  const loginInfo={
    "loginId":id,
    "password":password
  }

  
const click =(event)=>{
  if(event){
     if(event.target.id==='id'){
       setClickId(true)
     }
     if(event.target.id==='password'){
      setClickPassword(true)
     }
   }
 }
 
const loginAlertFunc=()=>{
  if(clickId){
    if(!id.trim()){
      setAlertId('아이디를 입력해 주세요.')
    }else if(id.trim()){
      setAlertId('')
    }
  }

  if(clickPassword){
    if(!password.trim()){
      setAlertPwd('비밀번호를 입력해 주세요.')
    }else if(id.trim()){
      setAlertPwd('')
    }
  }
}

const tabKey=(e)=>{
  if(e.key==="Tab"){
    loginAlertFunc()
  }
}

const tabKey2=(event)=>{
  if(event.key==="Tab"){
    click(event)
  }

}


  const loginPost = async()=>{


    await fetch('http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/login', {

    method: 'POST',
    headers: { 'content-Type' : 'application/json'},
    body: JSON.stringify(loginInfo)
  }).then((res) => res.json())
  .then((data)=>{
        console.log(data)
        if(data.data.accessToken){
          sessionStorage.setItem("accessToken", data.data.accessToken)
            if(location.state?.path){
              navigate(`${location.state.path}`)
            }else{
              navigate(`/`)
        
            }
        }
        // else{setAlertPwd('아이디 또는 비밀번호를 확인해 주세요.')}
      //그런데 우리는 자동로그인 기능이없으므로 refresh 토큰을 받았지만 쓸일이없음
      //그러므로  refresh 토큰은 받았지만 어디다 저장하지 않을거임 쓸일이없고 로그인 할때마다 엑세스 토큰을 받아야하기때문
    

      // access 토큰만 사용하는데 sessionStorage에 저장하니까 페이지 닫으면 사라짐  
     // 로그아웃버튼기능에 로그아웃을누르면   sessionStorage.removeItem("accessToken")로 세션에 엑세스토큰을 지워주면됨
     
      //headers: {
	    // Authorization: sessionStorage.getItem("accessToken"),
      // }
      //이제 회원정보가 필요한 통신을 할때 위에부분을 헤더부분에 추가해 세션스토레지 저장한 accessToken 을 
      //불러와서 쓰는거임


  }).catch((err) => {
      setAlertPwd('아이디 또는 비밀번호를 확인해 주세요.')
        // console.log(err)
  })
}








  const loginFunc=(event)=>{
    event.preventDefault();// 통신성공하면 없애주자
    loginPost();
   
  }
  return (
    <Container onKeyDown={tabKey} onMouseDown={loginAlertFunc}>
        <LoginForm onSubmit={(event)=>loginFunc(event)}>
          <span className='title-style'><Link className='link-style' to='/'>쓰위치</Link></span>
          <input id="id" name="id" type='text' placeholder="아이디" onKeyDown={tabKey2} onMouseDown={(event)=>click(event)} onChange={(e) => setId(e.target.value)}/>
          <AlertMsg>{alertId}</AlertMsg>
          <input id="password" name="password" type="password" placeholder="비밀번호" onKeyDown={tabKey2} onMouseDown={(event)=>click(event)} onChange={(e) => setPassword(e.target.value)}/>
          <AlertMsg>{alertPwd}</AlertMsg>

          <LoginButton type="submit">로그인</LoginButton>
          <div>아직 회원이 아니십니까? <Link to='/signup'>회원가입</Link></div>
          
        </LoginForm>
          <OauthLoginButton><Logo src='https://cdn-icons-png.flaticon.com/512/3991/3991999.png' alt='카카오로고'></Logo><div>카카오로 로그인하기</div></OauthLoginButton>
          <OauthLoginButton><Logo src='https://cdn-icons-png.flaticon.com/512/2702/2702602.png' alt='구글로고'></Logo><div>구글로 로그인하기</div></OauthLoginButton>
    </Container>
  )
}

export default LoginPage


const Container=styled.div`
display: flex;
height: 90vh;
justify-content: center;
align-items: center;
flex-direction: column;
.title-style{
  margin-bottom: 30px;
 
  a{
    text-decoration: none;
    color: rgb(71,182,181);
    font-size: xx-large;
    font-weight: bold;
  } 
};

input{
  overflow: hidden;
  width: 300px;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
}
`
const LoginForm=styled.form`
 display: flex;
  justify-content: center;
  align-items: center;
 background-color: white;
  flex-direction: column;
  padding: 5px;
  text-align: left; 
  border-radius: 10px;
`
const LoginButton=styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 300px;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 10px;
  background-color: rgb(71,182,181);
`
const AlertMsg=styled.div`
width: 300px;
text-align: left;
font-size: small;
color: red;
`
const OauthLoginButton =styled(LoginButton)`
background-color: white;
color: black;
box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
display: flex;
align-items: center;
 div{
  width: 100%;
 }

`
const Logo=styled.img`
    width: 30px;
    height: 30px;
    
`