import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineBell } from "react-icons/ai";
import { FaSearch, FaBars } from "react-icons/fa";

function NavBar({welcome}) {

    const [searchOn, setSearchOn] = useState(false)
    const [noticeOn, setNoticeOn] = useState(false)

  return (
    <>
    {welcome !== null ?
    <MobileSearchInput>
        <div className='search_bar'>
            <FaBars className='menu_icon'/>
            <input type="search" placeholder='검색...'></input>
            <div className='search_icon'><FaSearch /></div>
        </div>
    </MobileSearchInput>:
    undefined
    }
    <NavBarStyle>
        <div className='main_title'>
            <Link to='/'>쓰위치</Link>
        </div>
            <div className='search' onClick={() => {
                setSearchOn(!searchOn)
            }}><FaSearch/>검색</div>
        <div className='header'>
            <div className='point'>포인트교환
                <div className='drop'>
                    <li>포인트교환</li>
                </div>
            </div>
            <div className='news'>소식
                <div className='drop news'>
                    <li>공지사항</li>
                    <li>이벤트</li>
                </div>
            </div>
            <div className='community'>커뮤니티
                <div className='drop community'>
                    <li>자유게시판</li>
                </div>
            </div>
            <div className='service_center'>고객센터
                <div className='drop'>
                    <li>채팅상담</li>
                    <li>FAQ</li>
                    <li>건의사항</li>
                    <li>신고제보</li>
                    <li>운영정책</li>
                </div>
            </div>
            {1 !== 1 ?
            <Link to='/login'>로그인</Link> :
            <div>마이페이지
                <div className='drop'>
                    <li>내정보</li>
                    <li>회원수정</li>
                    <li>회원삭제</li>
                    {1 === 1 ? <li>관리자</li> : undefined}
                </div>
            </div>}
            {1 !== 1 ?
            <Link to='/signup'>회원가입</Link> :
            <div className='logout'>로그아웃</div>}
            <div className='drop_container'></div>
            </div>
            <div className='notice' onClick={() => {
                setNoticeOn(!noticeOn)
            }}><AiOutlineBell/></div>
    </NavBarStyle>
    <SearchInput>
        {searchOn?
        <div className='search_bar'>
        <input type="search" placeholder='검색어를 입력해주세요. ex) LCS로 53번길 21'></input>
        <div className='search_icon'><FaSearch /></div>
        </div>:
        undefined}
    </SearchInput>
        {noticeOn?
        <Notification>ㅁㄹㅁㄹ</Notification>:
        undefined}
    </>
  )
}

export default NavBar

const NavBarStyle = styled.div`
    height: 6vh;
    display: flex;
    align-items: center;
    font-size: 2vmin;
    user-select:none;

    a{
        text-decoration: none;
        color: black;
    }

    .logout{
        cursor: pointer;
    }

    .drop{
        list-style: none;
        position: absolute;
        margin-top: 3vh;
        font-size: 2vmin;
        z-index: 2;
        li, a{
            margin: 1.5vh 0px;
            margin-left: -0.8vw;
            padding: 5% 15%;
            width: 140%;
            cursor: pointer;
            :hover{
                background-color: #E38B29;
                color: white;
                font-weight: bold;
                border-radius: 20px;
            }
        }
        display: none;
    }

    .news{
        margin-left: -0.8vw;
    }

    .community{
        margin-left: -0.5vw;
    }

    .drop_container{
        position: fixed;
        right: 1%;
        top: 6.5%;
        background-color: lightgray;
        width: 76%;
        height: 25vh;
        z-index: 1;
        display: none;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    
    .header{
        display: flex;
        list-style: none;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 115%;
        cursor: default;
        :hover{
            .drop , .drop_container{
                display: block;
            }
        }
    }

    .main_title{
        width: 15%;
        display: flex;
        justify-content: center;
        a{
            color: rgb(71,182,181);
            font-weight: bold;
            font-size: 180%;
        }
    }

    .notice{
        font-size: 3vmin;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-right: 2vw;
    }

    .search{
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 8vw;
        margin-left: 4vw;
    }

    @media screen and (max-width: 500px){
        display: none;
    }
`

const SearchInput = styled.div`

    position: absolute;
    width: 100%;

    input{
        width: 90%;
        height: 40px;
        font-size: 2vmin;
        padding-left: 2vw;
    }

    .search_icon{
        display: flex;
        align-items: center;
        border: 0.8vmin solid rgb(71,182,181);
        padding: 1vh 2vw;
        cursor: pointer;
        border-radius: 20px;
        margin-right: 1vw;
    }

    .search_bar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
    }

    @media screen and (max-width: 500px){
        display: none;
    }
`

const Notification = styled.div`
    position: absolute;
    border: 1px solid black;
    width: 20vw;
    height: 50vh;
    right: 0;
    background-color: white;
`

const MobileSearchInput = styled.div`
    display: none;
    position: absolute;
    width: 100%;

    input{
        width: 70%;
        height: 40px;
        font-size: 5vmin;
        padding-left: 10px;
    }

    .search_icon, .menu_icon{
        display: flex;
        align-items: center;
        padding: 1vh 2vw;
        cursor: pointer;
    }

    .search_icon{
        padding-right: 30px;
    }

    .search_bar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
    }

    @media screen and (max-width: 500px){
        display: block;
    }
`