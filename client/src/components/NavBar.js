import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineBell } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

function NavBar() {

    const [searchOn, setSearchOn] = useState(false)

  return (
    <>
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
            <li className='notice'><AiOutlineBell/></li>
        </ul>
    </NavBarStyle>
    <SearchInput>
        {searchOn?
        <div className='search_bar'>
        <input type="search" placeholder='검색어를 입력해주세요.'></input>
        <div className=' search_icon'><FaSearch /></div>
        </div>:
        undefined}
    </SearchInput>
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
    }

    .search{
        display: flex;
        align-items: center;
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

    .search{
        display: flex;
        align-items: center;
    }

    .search_bar{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
    }
`