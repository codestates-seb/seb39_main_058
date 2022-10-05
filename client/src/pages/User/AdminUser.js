/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaQuestionCircle } from "react-icons/fa";
import { FcLike } from 'react-icons/fc';
import { BsPencilSquare } from 'react-icons/bs';
import { ImWarning } from 'react-icons/im';
import { HiPencil } from "react-icons/hi";
import InfiniteScroll from 'react-infinite-scroll-component';



function AdminUser() {
    const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
    
    const [ userData, setUserData ] = useState({});
    
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/users/profile`, {
            headers: {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setUserData(data.data))
            .catch(err => console.log(err))
    },[])

    // console.log(userData)
    // console.log(userInfo)


    return (
    <Main>
        <div className='wrapper'>
        <TopBackground/>
        <div className='user_info'>
            <AdminInfo>
                <div>
                    <div className='img_container' onClick={() => navigate('/users/profile/revise')}>
                        <img src={ userData.profileImage === null ? '/profile.png' : userData.profileImage}/>
                        <HiPencil className='edit'/>
                    </div>
                    <div className='flex'>
                        <div className='nickName'>{`${userInfo.userName}(관리자)`}</div>
                    </div>
                </div>
                <div className='detail'>
                    <div className='detail_content'>
                        <p>이메일 : {userData.email}</p>
                        <p>현재 포인트 : {userData.currentPoints}</p>
                        <p>누적 포인트 : {userData.totalPoints}</p>
                        <p>가입일 : {userData.dateCreated}</p>
                    </div>
                    <ButtonWrapper>
                        <button className='all_users_btn'
                            onClick={() => navigate("/admin-users/all-users")}>
                            전체 회원정보 조회하기
                        </button>
                    </ButtonWrapper>
                </div>
            </AdminInfo>
            <div className='rank_container'>
                <div className='flex_box icons'>
                    <span>글 쓴 횟수</span>
                    <BsPencilSquare className='icon'/>
                    <span>3회</span>
                </div>
               
                <div className='flex_box icons'>
                    <span>누적 좋아요 수</span>
                    <FcLike className='icon' />
                    <span>3회</span>
                </div>
            </div>
            <div className='etc'>
                <div className='history'>
                    <div className='bords_container'>
                        <div className='bords_list header'>
                            <span className='his'>내역</span>
                            <span className='date'>날짜</span>
                            <span className='point'>포인트</span>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
        </div>

        
    </Main>
    )
}

export default AdminUser;


const Main = styled.main`
    
    font-size: 3vmin;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 122vh;
    width: 100%;

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    } 

    .user_info{
        display: flex;
        flex-direction: column;
        background-color: white;
        position: absolute;
        width: 80%;
        top: 10vh;
        border-radius: 2%;
        padding: 2rem;
        border: .3rem solid rgb(64,156,155);

        @media screen and (max-width: 500px){
            border: none;
        }
    }




    .rank_img{
        width: 30vw;
        height: 20vh;
    }

    .more{
        cursor: pointer;
    }

    .edit{
        position: absolute;
        top: 13%;
        font-size: 200%;
        display: none;
    }

    @keyframes identifier {
        0%{
            padding: 0;
            opacity: 0;
        }

        20% {
            padding-left: 20vw;
            padding-right: 20vw;
        }

        100%{
            padding-left: 20vw;
            padding-right: 20vw;
            opacity: 1;
        }
    }

    .rank_container{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40vh;
        
        img{
            width: 35vw;
            height: 30vh;
        }

        .icon{
            font-size: 7vmin;
            padding: 3vh 0;
        }
    }

    .flex_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
            margin-bottom: -3vh;
        }
    }

    .icons{
        margin-top: 10vh;
    }

    .bords_container{
        width: 100%;
        overflow-y: scroll;
        font-size: 80%;
        margin-bottom: 5vh;
        border: 0.1rem solid black;
        height: 30vh
    }

    .bords_list{
        display: flex;
        border: 1px solid black;
        padding: .3vh .5vw;
        white-space: nowrap;
    }

    .header{
        background-color: lightgray;
        font-weight: bold;
    }

    .his{
        width: 40%;
    }

    .minus{
        color: red;
    }

    .plus{
        color: blue;
    }

    .date, .point{
        width: 30%;
        text-align: center;
    }


       

    .img_container{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30vw;
        height: 20vh;
        cursor: pointer;

        :hover{
            img{
                opacity: 0.5;
            }
            .edit{
                display: block;
            }
        }
    }

    .nickName{
        font-size: 3vmin;
        font-weight: bold;
        text-align: center;
        width: 100%;
    }

    .flex{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: default;
    }

    .select:hover{
        background-color: lightgray;
    }
    
`;

export const TopBackground = styled.div`
    background: linear-gradient(rgb(70,183,182), rgb(64,156,155));
    width: 100%;
    height: 30vh;
    position: fixed;
    top: 0;
    z-index: -1;

    @media screen and (max-width: 500px){
        display: none;
    }
`

const AdminInfo = styled.div`
    /* height: 40vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: .3rem solid rgb(64,156,155);

    img{
        width: 15vw;
        height: 15vh;
        border-radius: 50%;
        margin: 0 3vw;
        padding: 3vh 0;
    }

    .history{
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .detail {
        font-size: 3vmin;
    }
`;

export const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: white;
    position: absolute;
    width: 88vw;
    height: 120vh;
    top: 10vh;
    border-radius: 2%;
    padding: 2rem;
`;

// 회원탈퇴 모달창
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
    width: 55vw;
    height: 30vh;
    border-radius: 10px;
    font-family: Jua, serif;
    font-size: 3vmin;
  }

  .confirm-wrapper {
    display: flex;
    .confirm, .cancel {
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

const ButtonWrapper = styled.div`
    .all_users_btn {
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
        @media (max-width: 800px) {

        }
    }
`;