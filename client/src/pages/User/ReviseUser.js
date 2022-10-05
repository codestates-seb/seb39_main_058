import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { TopBackground, UserContainer } from "./User"
import { RemoveModal } from "../Community/CommunityDetail"
import { ImWarning } from 'react-icons/im';
import { AiFillGithub } from "react-icons/ai";
import { SiNotion } from "react-icons/si";

function ReviseUser() {
  
  const userInfo = useSelector(state => state.LoginPageReducer.userinfo)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ userData, setUserData ] = useState({});

  const [ email, setEmail ] = useState({ state: false, value: ""});
  const [ userName, setUserName ] = useState({ state: false, value: ""});
  const [ password, setPassword ] = useState({ state: false, value: ""});
  const [ profileImg, setProfileImg ] = useState({ state: false, value: ""})

  const [ withdrawal, setWithdrawal ] = useState(false);
  const [ logout, setLogout ] = useState(false);

  const [ fillout, setFillout ] = useState(false);
  const [ cancel, setCancel ] = useState(false);

  useEffect(() => {
    fetch(`https://sswitch.ga/users/profile`,{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => setUserData(data.data))
      .catch(err => console.log(err))
  }, []);

  const reviseUserInfo = {
    "userName" : !userName.value ? userData.userName: userName.value,
    "password" : password.value,
    "email": !email.value ? userData.email : email.value,
    "profileImage": profileImg.value,
  }

  // 회원정보 수정
  const handleSubmit = (e) => {

    // 프로필 이미지 링크와 비밀번호만 채워지고, 나머지 정보는 빈칸인 경우,
    if(profileImg.state && password.state && (!email.state || !userName.state)) {
      e.preventDefault();
      fetch(`https://sswitch.ga/users/profile`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${userInfo.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviseUserInfo)
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    } else {
      e.preventDefault();
      fetch(`https://sswitch.ga/users/profile`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${userInfo.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviseUserInfo)
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    // 이미지 링크와 비밀번호가 모두 빈칸인 경우(위 상황의 여사건),
    if(!profileImg.state || !password.state) {
      setFillout(!fillout);
      e.preventDefault();
      return
    }

    if(userInfo.role === "ROLE_ADMIN" || userInfo.role === "ROLE_USER") {
      navigate("/users/profile")
    }
    window.location.reload();
  };
  
  // console.log(userInfo)
console.log(userData);

  // 회원정보 수정 취소
  const confirmCancel = () => { 
    if(userInfo.role === "ROLE_ADMIN" || userInfo.role === "ROLE_USER") {
      navigate("/users/profile")
    }
  }

  // 회원탈퇴
  const userWithdraw = () => setWithdrawal(!withdrawal);
  const confirmWithdrawal = () => {
      fetch(`https://sswitch.ga/users/signout/`, {
          method: "DELETE",
          headers: {
          "Authorization": `Bearer ${userInfo.accessToken}`,
          "Content-Type": "application/json"
          }
      })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err))
      dispatch({type: "LOGOUT"})
      setLogout(false);
      navigate("/");
      window.location.reload();
  }
  
  return (
    <Main>
      <TopBackground/>
      <UserContainer>
        <ReviseInfo>
          <div className="revise_title">
            <span>회원정보 수정</span>
          </div>
          <div className="revise_info">
            <div>개인정보 변경을 통해 내정보를 안전하게 보호하세요.</div>
            <div><span style={{color: "#ff4500"}}>다른 사이트에서 사용한 적 없는 이메일/비밀번호</span>가 안전합니다.</div>
            <div><span style={{color: "#ff4500"}}>이전에 사용한 적 없는 비밀번호</span>가 안전합니다.</div>
          </div>
          <ReviseForm id="revise_confirm" onSubmit={handleSubmit}>
            <div className="img_wrapper">
              <img src={ !userData.profileImage ? "/profile.png" : userData.profileImage}/>
              <input type="text" id="image" name="image" placeholder="이미지 링크를 붙여넣으세요." onChange={ e => setProfileImg({ state: true, value: e.target.value })}/>
            </div>
            <div className="email_wrapper">
              <label htmlFor="email">이메일</label>
              <input type="text" id="email" name="email" placeholder="이메일을 입력하세요." onChange={ e => setEmail({ state: true, value: e.target.value })}/>
            </div>
            <div className="user_name_wrapper">
              <label htmlFor="user_name">닉네임</label>
              <input type="text" id="user_name" name="user_name" placeholder="닉네임을 입력하세요." onChange={ e => setUserName({ state: true, value: e.target.value })}/>
            </div>
            <div className="password_wrapper">
              <label htmlFor="password">비밀번호</label>
              <input type="text" id="password" name="password"placeholder="변경할 비밀번호를 입력하세요." onChange={ e => setPassword({ state: true, value: e.target.value })}/>
            </div>
          </ReviseForm>
            <div className="withdrawal_btn" onClick={() => setWithdrawal(!withdrawal)}>회원탈퇴</div>
          <ButtonWrapper>
            <button className="revise_confirm" form="revise_confirm">확인</button>
            <button className="revise_cancel" onClick={() => setCancel(!cancel)} >취소</button>
          </ButtonWrapper>
          <div className='etc'>
            <div>
              <a target='_black' href='https://github.com/codestates-seb/seb39_main_058'>
                <AiFillGithub className='icons' /></a>
              <a target='_black' href='https://www.notion.so/Team-Home-9761d432bafc478d929cef24b4878bfa'>
                <SiNotion className='icons' /></a>
            </div>
            <p>@Copyright LCS. All right reserved.</p>
          </div>
        </ReviseInfo>
        
        {/* 빈 칸 경고 모달창 */}
        { fillout && <RemoveModal>
            <div className="delete-warning">
              <ImWarning className="delete-warning-icon"/>
              <div>빈 칸은 수정이 불가합니다.</div>
              <div>모든 정보를 채워주세요.</div>
              <div className="confirm-wrapper">
                <div className="cancel" onClick={() => setFillout(!fillout)}>확인</div>
              </div>
            </div>
        </RemoveModal>}

        {/* 삭제 모달창 */}
        { cancel && <RemoveModal>
            <div className="delete-warning">
              <ImWarning className="delete-warning-icon"/>
              <div>변경된 내용을 복구할 수 없습니다.</div>
              <div>해당 작업을 취소하시겠습니까?</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={confirmCancel}>확인</div>
                <div className="cancel" onClick={() => setCancel(!cancel)}>취소</div>
              </div>
            </div>
        </RemoveModal>}

        {/* 회원탈퇴 모달창 */}
        { withdrawal && <RemoveModal>
            <div className="delete-warning">
              <ImWarning className="delete-warning-icon"/>
              <div>회원탈퇴 시, 회원님의 모든 정보가 삭제되며,</div>
              <div>삭제된 정보는 복구가 불가합니다.</div>
              <div>정말 회원탈퇴를 하시겠습니까?</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={confirmWithdrawal}>확인</div>
                <div className="cancel" onClick={() => setWithdrawal(!withdrawal)}>취소</div>
              </div>
            </div>
        </RemoveModal>}
       
      </UserContainer>
    </Main>
  )
}

export default ReviseUser

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviseInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  padding: 10px;
  width: 60vw;
  height: 100vh;
  @media (max-width: 800px) {
    width: 70vw;
    /* height: 75vh; */
  }

  .revise_title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Jua, serif;
    font-size: 4vmin;
    margin: 10px;
  }

  .revise_info > div {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.5vmin;
    margin: 5px 0;
  }

  .etc {
    margin-top: 5rem;
    .icons {
      padding: 0 3vmin;
      color: black;
      font-size: 6vmin;
    }

    p {
      font-size: 2vmin;
    }
  }

  .withdrawal_btn {
    margin: 1rem;
    padding: 1vmin 4vmin;
    border-radius: 1rem;
    border: 1px solid gray;
    font-size: 15px;
    font-family: 'Courier New', Courier, monospace;
    cursor: pointer;
    &:hover {
        color: black;
        background-color: lightgray;
        border: 1px solid lightgray;
    }
  }
`;

const ReviseForm = styled.form`
  padding: 2rem;
  font-family: 'Courier New', Courier, monospace;

  .img_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 8vw;
      height: 8vh;
      border: 2px solid rgb(71, 182, 181);
      border-radius: 50%;
      margin: 15px;
    }
  }

  .img_wrapper, .email_wrapper, .user_name_wrapper, .password_wrapper {
    padding: 10px 0;
    
    label {
      font-size: 2vmin;
      margin: 30px;
      @media (max-width: 800px) {
        font-size: 3vmin;
        margin: 10px;
      }
    }

    input {
      width: 20vw;
      height: 3vh;
      padding: 0 10px;
      @media (max-width: 800px) {
        width: 160px;
      }
    }
  }

  .password_wrapper {
    label {
      margin: 30px 23px;
      @media (max-width: 800px) {
        margin: 10px;
      }
    }
  }

  @media (max-width: 800px) {
    padding: 0;
    
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .icons {
    color: black;
  }
`;

const ButtonWrapper = styled.div`
  .revise_confirm {
    margin: 1rem;
    padding: 1vmin 4vmin;
    border-radius: 1rem;
    border: 1px solid gray;
    background-color: #38d9a9;
    color: white;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: rgb(71,182,181);
        border: 1px solid rgb(71,182,181);
    }
  }

  .revise_cancel {
    margin: 1rem;
    padding: 1vmin 4vmin;
    border-radius: 1rem;
    border: 1px solid gray;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: black;
        background-color: lightgray;
        border: 1px solid lightgray;
    }
  }

`;