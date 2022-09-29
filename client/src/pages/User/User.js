/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AiFillGold } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { BsPencilSquare } from 'react-icons/bs'

function User() {
    const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
    // const [ userName, setUserName ] = useState("");
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

    const userLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    const userRevise = () => {

    };

    const userWithdraw = () => {

    };

    return (
    <Main>
        <div className='wrapper'>
        <TopBackground/>
        <UserContainer>
            
                <UserPrivate>
                    <img className='user-profile' src="/profile.png" alt='profile'/>
                    <div className='user-name'><b>{userData.userName}</b>님</div>
                    <div className='user-level'>현재 등급: 실버</div>
                    <div className='user-email'>이메일: {userData.email}</div>
                    <div className='user-point'>보유 포인트: {userData.point}p</div>
                    <div className='user-point'>누적 포인트: 12345p</div>
                    <div className='button-wrapper'>
                        <button className='user-logout' onClick={userLogout} > 로그아웃 </button>
                        <button className='user-revise' onClick={userRevise}> 회원정보 수정 </button>
                        <button className='user-withdraw' onClick={userWithdraw}> 회원탈퇴 </button>
                    </div>
                </UserPrivate>
            
            <UserInfo>
                <div className='user-status'>
                    <h3 className='user-level'><AiFillGold className='status-icon'/>현재 등급: 실버</h3>
                    <h3 className='user-writing'><BsPencilSquare className='status-icon'/>작성글 횟수: 3회</h3>
                    <h3 className='user-received-likes'><FcLike className='status-icon'/>받은 추천수: 2회</h3>
                </div>
                <div className='user-point-history'>
                    <div className='user-point-content'>
                        <h3>사용내역</h3>
                        <span>1. 쉰전 떡볶이 기프티콘 </span>
                        <span>2. 베베큐 황금올리브 반반 기프티콘 </span>
                        <span>3. 쓰리스타 벅스 아메리카노 기프티콘 </span>
                        <span>4. 뚜렛주르 케이크 기프티콘 </span>
                        <span>5. 쓰레기통 위치 오류제보</span>
                    </div>
                    <div className='user-point-content'>
                        <h3>사용일자</h3>
                        <span>2022-09-14</span>
                        <span>2022-09-13</span>
                        <span>2022-09-13</span>
                        <span>2022-09-09</span>
                        <span>2022-09-06</span>
                    </div>
                    <div className='user-point-content'>
                        <h3 className='used-point'>포인트 사용</h3>
                        <span className='used-point'>-3000p</span>
                        <span className='used-point'>-20000p</span>
                        <span className='used-point'>-4800p</span>
                        <span className='used-point'>-18000p</span>
                        <span className='used-point'>+3000p</span>
                    </div>
                    <div className='user-point-content'>
                        <h3>남은 포인트</h3>
                        <span>7777p</span>
                        <span>10777p</span>
                        <span>30777p</span>
                        <span>35577p</span>
                        <span>53577p</span>
                        
                    </div>
                </div>

            </UserInfo>
        </UserContainer>
        </div>
    </Main>
    )
}

export default User;

const Main = styled.main`
    
    font-size: 2vmin;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }    
    
`;

const TopBackground = styled.div`
    background: linear-gradient(rgb(70,183,182), rgb(64,156,155));
    width: 100vw;
    height: 30vh;
`

const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    /* align-items: center; */
    background-color: white;
    position: absolute;
    width: 90vw;
    height: 120vh;
    top: 10vh;
    border-radius: 2%;
    padding: 2rem;
`;

const UserPrivate = styled.div`

    .user-profile {
        margin: 5px 2rem;
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }

    > div {
        margin: 1rem;
        @media (max-width: 500px) {
            margin: 0.5rem;
        }
    }

    .user-name {
        display: block;
        font-size: 3vmin;
        margin: 0.5rem;
        cursor: pointer;
    }

    .button-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-top: 1px solid gray;
        
        .user-logout, .user-revise, .user-withdraw {
            margin: 0.5rem;
            padding: 1vmin 4vmin;
            border-radius: 1rem;
            border: 1px solid gray;
            background-color: white;
            font-size: 1.5vmin;
            cursor: pointer;
            &:hover {
                color: white;
                background-color: rgb(71,182,181);
                border: 1px solid rgb(71,182,181);
            }
            @media (max-width: 500px) {
                margin: 0.2rem;
                padding: 0.5vmin 2vmin;
                
            }
        }
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;  
    font-size: 2vmin;
    .user-status {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        margin: 2rem;
        border: 1px solid gray;
        border-radius: 3rem;
        height: 20vh;
        @media (max-width: 950px) {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: auto;
        }
        .user-level, .user-writing, .user-received-likes {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            @media (max-width: 950px) {
                display: flex;
                flex-direction: row;
                margin: 0;
            }
        }

        .status-icon {
            padding: 10px;
            width: 5vw;
            height: 5vh;
        }

    }

    .user-point-history {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 2rem;
        border: 1px solid gray;
        border-radius: 3rem;
        height: 70vh;
        @media (max-width: 950px) {
            padding: 1rem;
            height: 15vh;
            font-size: .7rem;
        }
        @media (max-width: 650px) {
            font-size: .3rem;
        }

        .user-point-content {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            & > h3 {
                text-align: center;
            }
            @media (max-width: 1050px) {
                .used-point {
                    display: none;
                }
            }
        }
    }
`;