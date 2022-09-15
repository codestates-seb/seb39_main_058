import {React ,useState } from 'react'
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


function SignupPage() {
  const [id, setId] = useState('');
  const [clickId, setClickId] = useState(false);

  const [name,setName]= useState('');
  const [clickName, setClickName] = useState(false);

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [alertId,setAlertId]=useState('');
  const [alertName,setAlertName]=useState('');
  const [passwordMsg,setPassworMsg] =useState(true);
  const [alertPwd,setAlertPwd]=useState(false);
  const [rePasswordMsg,setRePassworMsg] =useState(true);
  const [alertRePwd,setAlertRePwd]=useState(false);
  const [alertSpaceKey,setAlertSpaceKey]=useState(false);


  


const click =(event)=>{
 if(event){
    if(event.target.id==='id'){
      setClickId(true)
    }
    if(event.target.id==='name'){
      setClickName(true)
    }
  }
}

const overlapConfirm=()=>{
  if(clickId){
    if(!id.trim()){
      setAlertId('아이디를 입력해 주세요.')
    }else if(id.trim()){
      setAlertId('')
      //post요청함수 
    }
  }

  if(clickName){
    if(!name.trim()){
      setAlertName('닉네임을 입력해 주세요.')
    }else if(name.trim()){
      setAlertName('')
      //post요청함수 
    }
  }
  if(password.length===0||password.length===password.trim().length){
    setAlertSpaceKey(false)
  }
  if(!password.trim()){
    setPassworMsg(true)
    setAlertPwd(false)
  
  }
  if(password.trim()){
    if(password.length<6){
      setPassworMsg(false)
      setAlertPwd(false)
      setRePassworMsg(true)
      setAlertRePwd(false)
    }else if(password.length>=6 ){
      setPassworMsg(true)
      setAlertPwd(true)
      if(rePassword===password){
        setRePassworMsg(true)
        setAlertRePwd(true)
      }else if(rePassword!==password){
      setRePassworMsg(false)
      setAlertRePwd(false)
      }
    
    }    
  }
  if(!rePassword.trim()){
    setRePassworMsg(true)
    setAlertRePwd(false)
  }



}



const tabKey=(e)=>{
   if(e.key==="Tab"){
    overlapConfirm()
   }
}

const tabKey2=(event)=>{
  if(event.key==="Tab"){
   click(event)
  }
}
const spaceKey=(event)=>{
  if(event.key===" "){
     setAlertSpaceKey(true)
   }
  //  else if(event.key==='Backspace' || 'Delete'){
  //    overlapConfirm()
  // }
}

   
  return (
    <Container onKeyDown={tabKey} onMouseDown={overlapConfirm}>
      <SignUpForm >
        <span className='title-style'><Link className='link-style' to='/'>쓰위치</Link></span>
        <p>회원정보를 입력해 주세요</p>
        <input id="id" name="id" type='text' placeholder="아이디" onKeyDown={tabKey2}  onMouseDown={(event)=>click(event)} onChange={(e) => setId(e.target.value)} />
        <OverlapForm>
          <AlertMsg>{alertId}</AlertMsg>
        </OverlapForm>

        <input id="name" name="name" type='text' placeholder="닉네임" onKeyDown={tabKey2} onMouseDown={(event)=>click(event)} onChange={(e) => setName(e.target.value)}/>
        <OverlapForm>
          <AlertMsg>{alertName}</AlertMsg>
        </OverlapForm>

        <input id="password" name="password" type="password" placeholder="비밀번호" onKeyDown={spaceKey} onChange={(e) => setPassword(e.target.value)}/>
        {
          alertSpaceKey ? <AlertMsg>비밀번호에 사용할 수 없는 문자가 포함되어 있습니다.</AlertMsg> :
          <PwdOverlapForm>
          {passwordMsg ?<InfoMsg>비밀번호는 6자리 이상이어야 합니다.</InfoMsg>: <AlertMsg>비밀번호는 6자리 이상이어야 합니다.</AlertMsg>}
          {alertPwd ?<CorrectMsg>사용 가능한 비밀번호 입니다.</CorrectMsg>:''}
        </PwdOverlapForm>
        }

        <input id="repassword" name="repassword" type="password" placeholder="비밀번호확인" onChange={(e) => setRePassword(e.target.value)}/>
        <PwdOverlapForm>
          {rePasswordMsg ?<InfoMsg>확인을 위해 입력한 비밀번호를 다시 입력해주세요.</InfoMsg>: <AlertMsg>비밀번호가 일치하지 않습니다.</AlertMsg>}
          {alertRePwd ?<CorrectMsg>비밀번호가 일치합니다.</CorrectMsg>:''}
        </PwdOverlapForm>






      </SignUpForm>
      <SignUpButton>회원가입</SignUpButton>      
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
  const PwdOverlapForm=styled(OverlapForm)`
  flex-direction: column;
  `
  // const OverlapConfirmButton=styled.button`
  
  // `

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
width: 300px;
text-align: left;
font-size: small;
color: red;
`
const InfoMsg=styled(AlertMsg)`
color: #888888;
`
const CorrectMsg=styled(AlertMsg)`
color: green;
`

