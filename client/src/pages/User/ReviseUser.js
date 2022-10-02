import React from "react"
import styled from "styled-components"
import { TopBackground, UserContainer } from "./User"

function ReviseUser() {
  return (
    <Main>
      <TopBackground/>
      <UserContainer>
        <ReviseInfo>
          <div className="revise-title">
            <span>회원정보 수정</span>
          </div>
          <ReviseForm id="revise-confirm">
            <label htmlFor="email">이메일</label>
            <input type="text" id="email" placeholder="변경할 이메일을 입력하세요."></input>
            
            <div>닉네임</div>
            <div>비밀번호</div>
          </ReviseForm>
        <ButtonWrapper>
          <button>확인</button>
          <button>취소</button>
        </ButtonWrapper>
        </ReviseInfo>
      
      </UserContainer>
    </Main>
  )
}

export default ReviseUser

const Main = styled.main`
  font-size: 2vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviseInfo = styled.div`
  border: 1px solid lightgray;
  padding: 10px;
  width: 60vw;
  height: 50vh;

  .revise-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Jua, serif;
  }
`;

const ReviseForm = styled.form`

`;

const ButtonWrapper = styled.div`
`;