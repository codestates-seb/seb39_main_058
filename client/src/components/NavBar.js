import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineBell } from "react-icons/ai";
import { FaSearch, FaBars } from "react-icons/fa";

function NavBar() {

    const [searchOn, setSearchOn] = useState(false)
    const [noticeOn, setNoticeOn] = useState(false)

  return (
    <>
    <MobileSearchInput>
        <div className='search_bar'>
            <FaBars className='menu_icon'/>
            <input type="search"></input>
            <div className=' search_icon'><FaSearch /></div>
        </div>
    </MobileSearchInput>
    <NavBarStyle>
        <div className='main_title'>
            <Link to='/'>쓰위치</Link>
        </div>
        <ul>
            <li className='search' onClick={() => {
                setSearchOn(!searchOn)
            }}><FaSearch/>검색</li>
            <li>포인트교환</li>
            <li>소식</li>
            <li>커뮤니티</li>
            <li>고객센터</li>
            <li>로그인</li>
            <li>회원가입</li>
            <li className='notice' onClick={() => {
                setNoticeOn(!noticeOn)
            }}><AiOutlineBell/></li>
        </ul>
    </NavBarStyle>
    <SearchInput>
        {searchOn?
        <div className='search_bar'>
        <input type="search" placeholder='검색어를 입력해주세요. ex) LCS로 53번길 21'></input>
        <div className=' search_icon'><FaSearch /></div>
        </div>:
        undefined}
    </SearchInput>
        {noticeOn?
        <Notification>asdad</Notification>:
        undefined}
    </>
  )
}

export default NavBar

const NavBarStyle = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 2vmin;
    ul{
        display: flex;
        list-style: none;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        cursor: default;
    }

    .main_title{
        width: 10%;
        display: flex;
        justify-content: center;
        a{
            text-decoration: none;
            color: black;
            font-weight: bold;
            font-size: 130%;
        }
    }

    .notice{
        font-size: 3vmin;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .search{
        display: flex;
        align-items: center;
        cursor: pointer;
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
        font-size: 2vmin
    }

    .search_icon{
        display: flex;
        align-items: center;
        border: 3px solid black;
        padding: 1vh 2vw;
        cursor: pointer;
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
    width: 40vw;
    height: 50vh;
    right: 0;
    background-color: white;
`

const MobileSearchInput = styled.div`
    display: none;
    position: absolute;
    width: 100%;

    input{
        width: 90%;
        height: 40px;
        font-size: 2vmin
    }

    .search_icon, .menu_icon{
        display: flex;
        align-items: center;
        padding: 1vh 2vw;
        cursor: pointer;
    }

    .search_bar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
    }

    .menu_icon{
    }

    @media screen and (max-width: 500px){
        display: block;
    }
`