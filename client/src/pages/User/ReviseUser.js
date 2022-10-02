import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

  const [ userData, setUserData ] = useState({});

  const [ cancel, setCancel ] = useState(false);

  useEffect(() => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/users/profile`,{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => setUserData(data.data))
      .catch(err => console.log(err))
  }, [])

  const reviseEmail = (e) => {
    console.log(e.target.value);
  };

  const reviseUserName = (e) => {
    console.log(e.target.value);
  };

  const revisePassword = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    // patch 요청!
    // navigate("/user/profile")

  };

  return (
    <Main>
      <TopBackground/>
      <UserContainer>
        <ReviseInfo>
          <div className="revise_title">
            <span>회원정보 수정</span>
          </div>
          <ul>
            <li>개인정보 변경을 통해 내정보를 안전하게 보호하세요.</li>
            <li><span style={{color: "#ff4500"}}>다른 사이트에서 사용한 적 없는 이메일/비밀번호</span>가 안전합니다.</li>
            <li><span style={{color: "#ff4500"}}>이전에 사용한 적 없는 비밀번호</span>가 안전합니다.</li>
          </ul>
          <ReviseForm id="revise_confirm" onSubmit={handleSubmit}>
            <div className="email_wrapper">
              <label htmlFor="email">이메일</label>
              <input type="text" id="email" name="email" placeholder="이메일을 입력하세요." onChange={reviseEmail}/>
            </div>
            <div className="user_name_wrapper">
              <label htmlFor="user_name">닉네임</label>
              <input type="text" id="user_name" name="user_name" placeholder="닉네임을 입력하세요." onChange={reviseUserName}/>
            </div>
            <div className="password_wrapper">
              <label htmlFor="password">비밀번호</label>
              <input type="text" id="password" name="password"placeholder="변경할 비밀번호를 입력하세요." onChange={revisePassword}/>
            </div>
          </ReviseForm>
        <ButtonWrapper>
          <button className="revise_confirm" form="revise_confirm">확인</button>
          <button className="revise_cancel" onClick={() => setCancel(!cancel)} >취소</button>
        </ButtonWrapper>
        </ReviseInfo>
        <div className='etc'>
          <div>
            <a target='_black' href='https://github.com/codestates-seb/seb39_main_058'><AiFillGithub className='icons'/></a>
            <a target='_black' href='https://www.notion.so/Team-Home-9761d432bafc478d929cef24b4878bfa'><SiNotion className='icons'/></a>
          </div>
          <p>@Copyright LCS. All right reserved.</p>
        </div>

        {/* 삭제 모달창 */}
        { cancel && <RemoveModal>
            <div className="delete-warning">
              <ImWarning className="delete-warning-icon"/>
              <div>삭제 이후 복구할 수 없습니다.</div>
              <div>해당 작업을 취소하시겠습니까?</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={() => navigate("/users/profile")}>확인</div>
                <div className="cancel" onClick={() => setCancel(!cancel)}>취소</div>
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
  height: 50vh;
  @media (max-width: 800px) {
    height: 70vh;
  }

  .revise_title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Jua, serif;
    font-size: 4vmin;
    margin: 10px;
  }

  ul > li {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.5vmin;
    margin: 5px 0;
  }
`;

const ReviseForm = styled.form`
  padding: 2rem;
  font-family: 'Courier New', Courier, monospace;

  .email_wrapper, .user_name_wrapper, .password_wrapper {
    padding: 10px 0;
        
    label {
      font-size: 2vmin;
      margin: 30px;
      @media (max-width: 800px) {
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