import {React ,useState } from 'react'
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import AnswerModal from '../../components/CommunityAnswer/AnswerModal';


function SignupPage() {
  const navigate=useNavigate();

  const [id, setId] = useState('');
  const [clickId, setClickId] = useState(false);

  const [name,setName]= useState('');
  const [clickName, setClickName] = useState(false);

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [emailInfo, setEmailInfo]=useState('');
  const [clickEmail,setClickEmail]= useState(false);


  const [alertId,setAlertId]=useState('');
  const [alertName,setAlertName]=useState('');
  const [passwordMsg,setPassworMsg] =useState(true);
  const [alertPwd,setAlertPwd]=useState(false);
  const [rePasswordMsg,setRePassworMsg] =useState(true);
  const [alertRePwd,setAlertRePwd]=useState(false);
  const [alertEmail,setAlertEmail]=useState('');

  const [alertSpaceId,setAlertSpaceId]=useState(false);
  const [alertSpaceName,setAlertSpaceName]=useState(false);
  const [alertSpacePwd,setAlertSpacePwd]=useState(false);
  const [alertSpaceRePwd,setAlertSpaceRePwd]=useState(false);
  const [alertSpaceEmail,setAlertSpaceEmail]=useState(false);

  const [alertOverlapId,setAlertOverlapId]=useState('')
  const [alertOverlapName,setAlertOverlapName]=useState('')
  const [alertOverlapEmail,setAlertOverlapEmail]=useState('')

  const [modalOn, setModalOn] = useState(false);
  const [nonPwd,setNonPwd]=useState(false)

const click =(event)=>{
 if(event){
    if(event.target.id==='id'){
      setClickId(true)
    }
    if(event.target.id==='name'){
      setClickName(true)
    }
    if(event.target.id==='email'){
      setClickEmail(true)
    }
  }

}

const overlapConfirm=()=>{
  if(clickId){
    if(id.length===0){
      setAlertOverlapId('')
      setAlertId('아이디를 입력해 주세요.')
    } else if(spaceCheck(id)===false||onlyEng(id)===false){
      setAlertOverlapId('')
      setAlertId('정확한 아이디를 입력해 주세요.')
        
    } else if(spaceCheck(id)===true&&onlyEng(id)===true){
        setAlertId('')
        setAlertSpaceId(false)
        idPost()
      }
    
  }

  if(clickName){
    if(name.length===0){
      setAlertOverlapName('')
      setAlertName('닉네임을 입력해 주세요.')
    }else if(spaceCheck(name)===false||koEng(name)===false){
      setAlertOverlapName('')
      setAlertName('정확한 닉네임을 입력해 주세요.')
    
    }else if(spaceCheck(name)===true&&koEng(name)===true){
      setAlertName('')
      setAlertSpaceName(false)
        namePost()
    }
  }
  if(clickEmail){
      if(emailInfo.length===0){
        setAlertOverlapEmail('')
        setAlertEmail('이메일을 입력해 주세요')
      }
      else if ( ! email_check(emailInfo) ) {
        setAlertOverlapEmail('')
        setAlertEmail('이메일을 올바르게 입력해주세요.');
      }
      else if(email_check(emailInfo)===true&&spaceCheck(emailInfo)){
        setAlertEmail('')
        setAlertSpaceEmail(false)
        emailPost()
      }
    }
    

}

const idPost = async()=>{


 let response= await fetch(`https://sswitch.ga/login-id/${id}/verification`)
 let data =await response.json();
 
//  console.log(data)
 if(data===true){
  setAlertOverlapId('')
  setAlertId('이미 사용중인 아이디입니다.')
 }else if(data===false){
  setAlertId('')
  setAlertOverlapId('사용 가능한 아이디 입니다.')
 }
 
}


const namePost = async()=>{


  let response= await fetch(`https://sswitch.ga/username/${name}/verification`)
  let data =await response.json();
  
  // console.log(data)
  if(data===true){
    setAlertOverlapName('')
    setAlertName('이미 사용중인 닉네임 입니다.')
   }else if(data===false){
    setAlertName('')
    setAlertOverlapName('사용 가능한 닉네임 입니다.')
   }

 
}


const emailPost = async()=>{


  let response= await fetch(`https://sswitch.ga/email/${emailInfo}/verification`)
  let data =await response.json();
  
  // console.log(data)
  if(data===true){
    setAlertOverlapEmail('')
    setAlertEmail('이미 사용중인 이메일 입니다.')
   }else if(data===false){
    setAlertEmail('')
    setAlertOverlapEmail('사용 가능한 이메일 입니다.')
   }
  

}



//이메일확인정규식
function email_check( email) {

  let regex=/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return (email !== '' && email !== 'undefined' && regex.test(email));    
  }

  
//글자에 공백있나없나체크함수
function spaceCheck(txt){
  let abc=txt.replace(/(\s*)/g,'')
  if(abc.length!==0){

    return(abc.length===txt.length )
  }
}
//영문 숫자만 입력가능하게하는함수
function onlyEng(txt){
  let regex= /^[A-Za-z0-9]+$/;
  return (txt !== '' && txt !== 'undefined' && regex.test(txt));  
}

//한글 영문 숫자만 입력가능하게하는 함수
function koEng(txt){
  let regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  return (txt !== '' && txt !== 'undefined' && regex.test(txt)); 
}

useEffect(()=>{
  passwordConfirmFunc()
},[password,rePassword])

const passwordConfirmFunc=()=>{
  setNonPwd(false)
  if(password.length===0 ||spaceCheck(password)===true){
    setAlertSpacePwd(false)
  }
  if(spaceCheck(rePassword)===true||rePassword.length===0){
    setAlertSpaceRePwd(false)
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
    passwordConfirmFunc()
   }
}

const tabKey2=(event)=>{
  if(event.key===" "&&event.target.id==='id'){
    setAlertSpaceId(true)
  }
  if(event.key===" "&&event.target.id==='name'){
    setAlertSpaceName(true)
  }
  if(event.key===" "&&event.target.id==='email'){
    setAlertSpaceEmail(true)
  }
  if(event.key==="Tab"){
   click(event)
  }
}
const spaceKey=(event)=>{
  if(event.key===" "){
    setAlertSpacePwd(true)
   
   }
   else if(event.key==='Backspace' || 'Delete'){
   passwordConfirmFunc()
  }
}
const spaceKey2=(event)=>{
  if(event.key===" "){
  
    setAlertSpaceRePwd(true)
   }
   else if(event.key==='Backspace' || 'Delete'){
   passwordConfirmFunc()
  }
}


const signupPostFunc=async()=>{
  if(id.length===0){
    setAlertId('아이디를 입력해 주세요.')
  } 
  if(name.length===0){
   
    setAlertName('닉네임을 입력해 주세요.')
  }
  if(emailInfo.length===0){
    setAlertEmail('이메일을 입력해 주세요')
  }
  if(password.length===0){
    setNonPwd(true)
  }
  if(password!==rePassword){
    setRePassworMsg(false)
  }
  if (spaceCheck(id)===true&& onlyEng(id)===true&&spaceCheck(name)===true&& koEng(name)===true&& email_check(emailInfo)===true&&spaceCheck(emailInfo)===true && password===rePassword &&spaceCheck(password)===true&& password.length>=6 ){
    
    const signupInfo ={
      "loginId": id,
      "userName": name,
      "password": password,
      "email": emailInfo
    }
   await fetch(`https://sswitch.ga/signup`, {

    method: 'POST',
    headers: { 'content-Type' : 'application/json'},
    body: JSON.stringify(signupInfo)
  }).then((res) => {
  
    // console.log(res)
    if(res.ok===true){
      setModalOn(!modalOn)
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    }else if(res.ok===false){
        alert('작성하신 회원정보를 다시 확인해 주세요.')
    }

  }).catch((err) => {
  })
    // console.log('signupinfo:',signupInfo)
  }

}

   
  return (
    <Container onKeyDown={tabKey} onMouseDown={()=>{overlapConfirm();passwordConfirmFunc()}} >
   

      <SignUpForm >
        <span className='title-style'><Link className='link-style' to='/'>쓰위치</Link></span>
        <p>회원정보를 입력해 주세요</p>
        <input id="id" name="id" type='text' placeholder="아이디" autocomplete="off" onKeyDown={tabKey2}  onMouseDown={(event)=>click(event)} onChange={(e) => setId(e.target.value)} />
        {
          alertSpaceId ? <AlertMsg>사용할 수 없는 문자가 포함되어 있습니다.</AlertMsg> :
          <OverlapForm>
          <AlertMsg>{alertId}</AlertMsg>
          <CorrectMsg>{alertOverlapId}</CorrectMsg>
        </OverlapForm>
        }
        <InfoMsg>아이디는 영문과 숫자만 가능 합니다.</InfoMsg>

        <input id="name" name="name" type='text' placeholder="닉네임" autocomplete="off" onKeyDown={tabKey2} onMouseDown={(event)=>click(event)} onChange={(e) => setName(e.target.value)}/>
        {
          alertSpaceName ? <AlertMsg>사용할 수 없는 문자가 포함되어 있습니다.</AlertMsg> :
          <OverlapForm>
          <AlertMsg>{alertName}</AlertMsg>
          <CorrectMsg>{alertOverlapName}</CorrectMsg>
          </OverlapForm>
          } 
          <InfoMsg>닉네임은 영문,한글,숫자만 가능 합니다.</InfoMsg>

        <input id="password" name="password" type="password" placeholder="비밀번호" onKeyDown={spaceKey} onChange={(e) => setPassword(e.target.value)}/>
        {
          alertSpacePwd ? <AlertMsg>사용할 수 없는 문자가 포함되어 있습니다.</AlertMsg> :
          <PwdOverlapForm>
          {alertPwd ?<CorrectMsg>사용 가능한 비밀번호 입니다.</CorrectMsg>:''}
          {passwordMsg ?<InfoMsg>비밀번호는 6자리 이상 이어야 합니다.</InfoMsg>: <AlertMsg>비밀번호는 6자리 이상이어야 합니다.</AlertMsg>}
          {nonPwd ?<AlertMsg>비밀번호를 입력해 주세요</AlertMsg>:''}
        </PwdOverlapForm>
        }

        <input id="repassword" name="repassword" type="password" placeholder="비밀번호확인" onKeyDown={spaceKey2} onChange={(e) => setRePassword(e.target.value)}/>
        {
          alertSpaceRePwd ? <AlertMsg>사용할 수 없는 문자가 포함되어 있습니다.</AlertMsg> :
        <PwdOverlapForm>
          {alertRePwd ?<CorrectMsg>비밀번호가 일치합니다.</CorrectMsg>:''}
          {rePasswordMsg ?<InfoMsg>확인을 위해 설정한 비밀번호를 다시 입력해주세요.</InfoMsg>: <AlertMsg>비밀번호가 일치하지 않습니다.</AlertMsg>}
        </PwdOverlapForm>
         }

        <input id="email" name="email" type='text' placeholder="이메일" autocomplete="off" onKeyDown={tabKey2}  onMouseDown={(event)=>click(event)} onChange={(e) => setEmailInfo(e.target.value)} /> 
        {
          alertSpaceEmail ? <AlertMsg>사용할 수 없는 문자가 포함되어 있습니다.</AlertMsg> :
          <OverlapForm>
        <AlertMsg>{alertEmail}</AlertMsg>
        <CorrectMsg>{alertOverlapEmail}</CorrectMsg>
        </OverlapForm>
        }



      </SignUpForm>
      <SignUpButton onClick={signupPostFunc}>회원가입</SignUpButton>      
       

       {/* 삭제 모달창 */}

      {modalOn && (
        <AnswerModal closeModal={() => setModalOn(!modalOn)}>
          <ModalItem>
             
              <div className='modalHead'>쓰위치</div>
              <div className='modalInfo'>회원가입에 성공했습니다!</div>
              

          </ModalItem>
        </AnswerModal>
        )}
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
@media (max-width: 550px) {
          height: 100%;
          margin-top: 50px;
           
          

          
      }


.title-style{
  margin-bottom: 30px;
  font-family: 'Gugi', cursive;
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
  flex-direction: column;
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
/* white-space:nowrap; */

`
const InfoMsg=styled(AlertMsg)`
color: #888888;

`
const CorrectMsg=styled(AlertMsg)`
color: green;
`

const ModalItem=styled.div`
font-family: Jua, serif;
font-size: x-large;
 display: flex;
flex-direction: column;

 
 
 .modalHead{
  font-family: 'Gugi', cursive;
  color: rgb(71,182,181);
    font-size: xx-large;
    font-weight: bold;
    margin-bottom: 20px;
}

.modalInfo{
}
`