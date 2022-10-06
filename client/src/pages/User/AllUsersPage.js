import React, { useState, useEffect } from 'react'
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { TopBackground } from './AdminUser'
import { ImWarning } from 'react-icons/im';

function AllUsersPage() {

  const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
  

  const [ allUsers, setAllUsers ] = useState([]);
  const [ pageInfo, setPageInfo ] = useState([]);
  const [ pointBtn, setPointBtn ] = useState(false);


  const [ dateCreated, setDateCreated ] = useState([]);
  // 서버 날짜 기반 customizing
  const createdDate = new Date();
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const date = createdDate.getDate();
  const hours = createdDate.getHours();
  const minutes = createdDate.getMinutes();
  const today = ['(일)','(월)','(화)','(수)','(목)','(금)','(토)'];

  // console.log(allUsers[0].dateCreated)

  // 전체 유저 정보 받아오기
  useEffect(() => {
    fetch(`https://sswitch.ga/admin/users/`, {
        headers: {
            "Authorization": `Bearer ${userInfo.accessToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
          setAllUsers(data.data);
          setPageInfo(data.pageInfo);
        })
        .catch(err => console.log(err))
  },[])

  return (
    <>
    <Main>
      <TopBackground/>
      <AllUsersWrapper>
        {allUsers.map((allUser) => 
          <EachUser key={allUser?.userId}>
            <img src={allUser?.profileImage ? allUser?.profileImage : "/profile.png" } /> 
            <div className="user_info">
              <div className="loginId">아이디 : {allUser?.loginId}</div>
              <div className="email">이메일 : {allUser?.email}</div>
              <div className="email">닉네임 : {allUser?.userName}</div>
              <div className="status">상태 : {allUser?.role === "ROLE_USER" ? "일반회원" : "관리자"}</div>
              <div className="current_points">현재 포인트 : {allUser?.currentPoints}</div>
              <div className="total_points">누적 포인트 : {allUser?.totalPoints}</div>
              <div className="email">
                가입일자 : {`${allUser?.dateCreated.slice(0,4)}년 
                          ${allUser?.dateCreated.slice(5,7)}월
                          ${allUser?.dateCreated.slice(8,10)}일
                          ${allUser?.dateCreated.slice(11,13)}시
                          ${allUser?.dateCreated.slice(14,16)}분`}
              </div>
            </div>
            <button className='point_btn' onClick={() =>setPointBtn(!pointBtn)}>포인트 지급</button>
          </EachUser>)}
      </AllUsersWrapper>

      {/* 포인트 지급 모달창 */}
      { pointBtn && <RemoveModal>
            <div className="delete-warning">
              <ImWarning className="delete-warning-icon"/>
              <div>해당 기능은</div>
              <div>현재 서비스 구현 중입니다.</div>
              <div>빠른 시일 내에 찾아뵙겠습니다.</div>
              <div className="confirm-wrapper">
                <div className="confirm" onClick={() => setPointBtn(!pointBtn)}>확인</div>
              </div>
            </div>
        </RemoveModal>}
    </Main>
    </>
  )
}

export default AllUsersPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AllUsersWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 60vw;
  margin-top: 60px;
  border-radius: 20px;
  padding: 2rem;
  border: .3rem solid rgb(64,156,155);
`;

const EachUser = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 100px;
    height: 100px;
    margin: 0 20px;
    border-radius: 50%;
    @media (max-width: 650px) {
      width: 65px;
      height: 65px;
    }
    @media (max-width: 400px) {
      width: 50px;
      height: 50px;
    }
  }

  .user_info {
    div {
      padding: 3px;
      font-size: 2vmin;
    }
  }

  .point_btn {
      margin: 1rem;
      padding: 1vmin 4vmin;
      border-radius: 1rem;
      border: 1px solid gray;
      background-color: rgb(71,182,181);
      color: white;
      font-size: 2vmin;
      cursor: pointer;
      &:hover {
          color: white;
          background-color: #38d9a9;
          border: 1px solid gray;
      }
      @media (max-width: 850px) {
        font-size: 1vmin;
      }
    }
`;

const RemoveModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  white-space: nowrap;

  .delete-warning {
    .delete-warning-icon {
      color: rgb(254,104,0);
      font-size: 5vmin;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    width: 70vw;
    height: 45vh;
    border-radius: 10px;
    font-family: Jua, serif;
    font-size: 4vmin;
  }

  .confirm-wrapper {
    display: flex;
    .confirm {
      margin: 0.2rem;
      padding: 0.3rem;
      border: 3px solid black;
      border-radius: 5px;
      :hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }
`;