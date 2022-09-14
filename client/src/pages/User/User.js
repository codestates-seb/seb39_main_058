/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import styled, { css } from 'styled-components';

function User() {

    return (
    <Main>
        <div className='wrapper'>
        <TopBackground/>
        <UserContainer>
            {/* <div className='user-private'> */}
                <UserPrivate>
                    <img className='user-profile' src="/profile.png" alt='profile'/>
                    <div className='user-name'><b>김야긴(Jakin)</b>님</div>
                    <div className='user-level'>현재 등급: 실버</div>
                    <div className='user-email'>이메일: kimyagin94@gmail.com</div>
                    <div className='user-point'>보유 포인트: 7777p</div>
                    <div className='user-point'>누적 포인트: 12345p</div>
                    <div className='button-wrapper'>
                        <button className='user-logout' > 로그아웃 </button>
                        {/* <button className='user-logout'> 회원정보 수정 </button>
                        <button className='user-logout'> 회원탈퇴 </button> */}
                    </div>
                </UserPrivate>
            {/* </div> */}
            <UserInfo>
                <div className='user-status'>
                    <h3 className='user-level'>현재 등급: 실버</h3>
                    <h3>작성글 횟수: 3회</h3>
                    <h3>받은 추천수: 2회</h3>
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
                        <h3>포인트 사용</h3>
                        <span>-3000p</span>
                        <span>-20000p</span>
                        <span>-4800p</span>
                        <span>-18000p</span>
                        <span>+3000p</span>
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
    background-color: ivory;
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

    & > div {
        margin: 1rem;
    }

    .user-name {
        display: block;
        background-color: ivory;
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
        
        .user-logout {
            margin: 1rem;
            padding: 1vmin 4vmin;
            border-radius: 1rem;
            border: 1px solid gray;
            background-color: ivory;
            font-size: 1.5vmin;
            cursor: pointer;
            &:hover {
                color: white;
                background-color: rgb(71,182,181);
                border: 1px solid rgb(71,182,181);
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

        .user-point-content {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            & > h3 {
                text-align: center;
            }
        }
    }
`;