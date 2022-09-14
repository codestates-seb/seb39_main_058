import {React ,useState } from 'react'
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


function SignupPage() {
  const [id, setId] = useState('');
  const [clickId, setClickId] = useState(false);
  const [password, setPassword] = useState("");
  const [clickPwd, setClickPwd] = useState(false);

  const [alertId,setAlertId]=useState('');
  const [alertPwd,setAlertPwd]=useState('');
  //비밀번호6자리이상


const confirm =(event)=>{
 if(event?.type==='click'){
    if(event.target.id==='id'){
      setClickId(true)
    }

  }
}

const containerConfirm=()=>{
  if(clickId){
    if(!id){
      setAlertId('아이디를 입력하세요')
    }else if(id){
      setAlertId('')
      //post요청함수 
    }
  }
  if(clickPwd){

  }
 
}


  
   
  return (
    <Container onClick={()=>containerConfirm()}>
      <SignUpForm >
        <span className='title-style'><Link className='link-style' to='/'>쓰위치</Link></span>
        <p>회원정보를 입력해 주세요</p>
        <input id="id" name="id" type='text' placeholder="아이디" onClick={(event)=>confirm(event)} onChange={(e) => setId(e.target.value)} />
        <OverlapForm>
          <AlertMsg>{alertId}</AlertMsg>
        </OverlapForm>

        <input id="name" name="name" type='text' placeholder="닉네임" onChange={(e) => setPassword(e.target.value)}/>
        <OverlapForm>
          <AlertMsg>{alertPwd}</AlertMsg>
        </OverlapForm>

        <input id="password" name="password" type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)}/>
        <input id="confirm-password" name="confirm-password" type="password" placeholder="비밀번호확인" onChange={(e) => setPassword(e.target.value)}/>





      </SignUpForm>
      
    </Container>
  )
}

export default SignupPage

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
const SignUpForm=styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
 background-color: white;
  flex-direction: column;
  padding: 5px;
  text-align: left; 
  border-radius: 10px;
  `

  const OverlapForm=styled.div`
  display: flex;
  width: 300px;
  `
  const OverlapConfirmButton=styled.button`
  
  `

const SignUpButton=styled.button`
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
width: 230px;
text-align: left;
font-size: small;
color: red;
`
