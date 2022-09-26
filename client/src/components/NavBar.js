import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineBell } from "react-icons/ai";
import { FaSearch, FaBars } from "react-icons/fa";

function NavBar({welcome}) {

    const [searchOn, setSearchOn] = useState(false)
    const [noticeOn, setNoticeOn] = useState(false)
    const [logout, setLogout] = useState(false)

    const navigate = useNavigate();

    const clear = () => {
        setNoticeOn(false)
        setSearchOn(false)
    }

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
            <Link to='/' onClick={() => {
                clear()
            }}>쓰위치</Link>
        </div>
            <div className='search' onClick={() => {
                setSearchOn(!searchOn)
            }}><FaSearch/>검색</div>
        <div className='header'>
            <div className='community'>커뮤니티
                <div className='drop community'>
                    <li><Link to = '/community/forum'>자유게시판</Link></li>
                </div>
            </div>
            <div className='service_center'>고객센터
                <div className='drop'>
                    <li>채팅상담</li>
                    <li>FAQ</li>
                    <li>운영정책</li>
                </div>
            </div>
            <div className='point'>포인트교환
                <div className='drop'>
                    <li>포인트교환</li>
                </div>
            </div>
            <div className='news'>소식
                <div className='drop news'>
                    <li><Link to= '/news/notice'>공지사항</Link></li>
                    <li>이벤트</li>
                </div>
            </div>
            {!sessionStorage.getItem("accessToken") ?
            <Link to='/login' onClick={clear}>로그인</Link> :
            <div>마이페이지
                <div className='drop'>
                    <li><Link to='/users/:id' onClick={clear}>내정보</Link></li>
                    <li>회원수정</li>
                    <li>회원삭제</li>
                    {1 === 1 ? <li>관리자</li> : undefined}
                </div>
            </div>}
            {!sessionStorage.getItem("accessToken") ?
            <Link to='/signup' onClick={clear}>회원가입</Link> :
            <div className='logout' onClick={() => {
                setLogout(true)
            }}>로그아웃</div>}
            <div className='drop_container'></div>
        </div>
            <div className='notice' onClick={() => {
                setNoticeOn(!noticeOn)
            }}><AiOutlineBell/></div>
    </NavBarStyle>
    {logout ?
    <LogoutStyle>
        <div className='view'>
          <div>로그아웃 하시겠습니까?</div>
          <div className='confirm'>
            <div onClick={() => {
                sessionStorage.removeItem("accessToken")
                navigate('/')
                setLogout(false)
            }}>확인</div>
            <div onClick={() => {
                setLogout(false)
            }}>취소</div>
          </div>
        </div>
    </LogoutStyle> :
    undefined}
    <SearchInput>
        {searchOn ?
        <div className='search_bar'>
        <input type="search" placeholder='검색어를 입력해주세요. ex) LCS로 53번길 21'></input>
        <div className='search_icon'><FaSearch /></div>
        </div> :
        undefined}
    </SearchInput>
        {noticeOn ?
        <Notification>현재 알림이 없습니다.</Notification> :
        undefined}
    </>
  )
}

export default NavBar

const LogoutStyle = styled.div`
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

    .view{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    width: 30vw;
    height: 20vh;
    border-radius: 1rem;
    font-size: 3vmin;

    .confirm{
      display: flex;
      justify-content: space-around;
      width: 100%;
      div{
        border: 3px solid black;
        padding: 0.5vh 1vw;
        border-radius: 10px;
        cursor: pointer;

        :hover{
          background-color: gray;
          color: white;
          font-weight: bold;
        }
      }
    }
  }
`

const NavBarStyle = styled.div`
    height: 6vh;
    display: flex;
    align-items: center;
    font-size: 2vmin;
    user-select:none;
    background-color: white;
    border-bottom: 3px solid rgb(71,182,181);
    white-space: nowrap;

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
        margin-top: 2vh;
        font-size: 2vmin;
        z-index: 4;
        margin-left: -0.5vw;
        display: none;
        li{
            animation-name: drop_list;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
            cursor: pointer;
            :hover{
                background-color: #E38B29;
                color: white;
                font-weight: bold;
                border-radius: 20px;
                a{
                    color: white;
                }
            }
        }
    }

    @keyframes drop_list {
        0%{
            padding: 0vh 0.5vw;
            width: 100%;
            opacity: 0;
        }

        100%{
            padding: 0.3vh 0.5vw;
            width: 100%;
            margin: 1.5vh 0;
            opacity: 1;
        }
    }

    .news{
        margin-left: -1vw;
    }

    .community{
        margin-left: -1.2vw;
    }

    .drop_container{
        position: absolute;
        right: 0;
        top: 6%;
        background-color: lightgray;
        width: 79%;
        height: 20vh;
        z-index: 3;
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
                animation-name: slide_down;
                animation-duration: 0.5s;
            }
        }
    }

    @keyframes slide_down {
        0%{
            height: 6vh;
        }

        100%{
            height: 20vh;
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
    width: 95%;
    z-index: 2;
    margin-top: .5vh;

    input{
        width: 90%;
        height: 40px;
        font-size: 2vmin;
        padding-left: 2vw;
    }

    .search_icon{
        display: flex;
        align-items: center;
        border: 0.5vmin solid black;
        background-color: white;
        padding: 1vh 2vw;
        cursor: pointer;
        border-radius: 20px;
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
    z-index: 2;
`

const MobileSearchInput = styled.div`
    display: none;
    width: 103%;
    background-color: white;
    margin-left: -2.5vw;

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