import React, { useState, useEffect } from 'react'
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { TopBackground } from './AdminUser'

function AllUsersPage() {

  const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
  

  const [ allUsers, setAllUsers ] = useState([]);
  const [ pageInfo, setPageInfo ] = useState([]);

  useEffect(() => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/admin/users/`, {
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

  console.log(allUsers)
  return (
    <>
    <Main>
      <TopBackground/>
      <AllUsersWrapper>
        {allUsers.map((allUser, idx) => 
          <EachUser key={allUser?.userId}>
            <img src={allUser?.profileImage ? allUser?.profileImage : "/profile.png" } /> 
            <div className="user_info">
              <div className="loginId">아이디 : {allUser?.loginId}</div>
              <div className="email">이메일 : {allUser?.email}</div>
              <div className="email">닉네임 : {allUser?.userName}</div>
              <div className="status">상태 : {allUser?.role === "ROLE_USER" ? "일반회원" : "관리자"}</div>
              <div className="email">가입일자 : {allUser?.dateCreated}</div>
              <div className="current_points">현재 포인트 : {allUser?.currentPoints}</div>
              <div className="total_points">누적 포인트 : {allUser?.totalPoints}</div>
            </div>
          </EachUser>)}
      </AllUsersWrapper>
      
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
  width: 80vw;
  margin-top: 60px;
  border-radius: 20px;
  padding: 2rem;
  border: .3rem solid rgb(64,156,155);
`;

const EachUser = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
    font-size: 2vmin;
    div {
      padding: 3px;
    }  
  }
`