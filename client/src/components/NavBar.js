import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineBell, AiFillGithub } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux"
import { BsTrash } from "react-icons/bs";
import Guide from './Guide'

function NavBar({welcome}) {

    const [noticeOn, setNoticeOn] = useState(false)
    const [logout, setLogout] = useState(false)
    const [guide, setGuide] = useState(0)
    const [menu, setMenu] = useState(false)
    const [alarms, setAlarms] = useState([])

    const navigate = useNavigate();

    const clear = () => {
        setNoticeOn(false)
        setMenu(false)
    }

    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.LoginPageReducer.userinfo)

    useEffect(() => {
        if(userInfo.accessToken){
            fetch(`https://sswitch.ga/trash/alarms/list`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${userInfo.accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                setAlarms(res.data)
            })
            .catch(err => console.log(err))
        }
    },[userInfo])

    const handleDelete = (id) => {
        fetch(`https://sswitch.ga/trash/alarms/${id}`,{
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            fetch(`https://sswitch.ga/trash/alarms/list`,{
            method : "GET",
            headers : {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
            })
            .then(res => res.json())
            .then(res => {
                setAlarms(res.data)
            })
        })
        .catch((err) => console.log(err))
        
    }


  return (
    <>
    {welcome !== null ?
    <MobileNavBar>
        <div className='search_bar'>
            <div className='menu_icon' onClick={() => {
                menu ? setMenu(false) : setMenu(true)
            }}><FaBars/></div>
            <div className='main_title'>
                <Link to='/' onClick={() => {
                    clear()
                    window.scrollTo(0, 0);
                    }}>쓰위치</Link>
            </div>
        {userInfo.accessToken ?
        <div className='login' onClick={() => {
            clear()
            navigate('/users/profile')
        }}>내정보</div> :
        <div className='login' onClick={() => {
            clear()
            navigate('/login')
        }}>로그인</div> }
        </div>
    </MobileNavBar> : undefined}
    {menu ?
    <MobileSideBar>
        <div className='side_bar_back' onClick={() => clear()}>
            <div className='side_bar_view' onClick={(e) => e.stopPropagation()}>
                <div className='section first'>
                    <div className='title'>커뮤니티</div>
                    <div>
                        <li onClick={() => {
                            navigate('/community/forum')
                            clear()
                            }}>자유게시판</li>
                    </div>
                </div>
                <div className='section'>
                    <div className='title'>고객센터</div>
                    <div>
                        <li><a target='_black' href='http://pf.kakao.com/_puDuxj/chat'>채팅상담</a></li>
                        <li onClick={() => {
                            navigate('/cs/faq')
                            clear()
                        }}>FAQ</li>
                        <li onClick={() => {
                            navigate('/cs/operationpolicy')
                            clear()
                        }}>운영정책</li>
                        <li onClick={() => {
                            setGuide(1)
                            clear()
                            }}>가이드</li>
                    </div>
                </div>
                <div className='section'>
                    <div className='title'>포인트교환</div>
                    <div>
                        <li onClick={() => {
                            navigate('/goods')
                            clear()
                            }}>쿠폰교환</li>
                    </div>
                </div>
                <div className='section'>
                    <div className='title'>소식</div>
                    <div>
                        <li onClick={() => {
                            navigate('/news/notice')
                            clear()
                            }}>공지사항</li>
                        <li onClick={() => {
                            navigate('news/event')
                            clear()
                        }}>이벤트</li>
                    </div>
                </div>

                {userInfo.accessToken ?
                <div className='logout' onClick={() => {
                    setLogout(true)
                }}>
                    로그아웃
                </div> : undefined}

                <div className='etc'>
                    <div>
                        <a target='_black' href='https://github.com/codestates-seb/seb39_main_058'><AiFillGithub className='icons'/></a>
                        <a target='_black' href='https://www.notion.so/Team-Home-9761d432bafc478d929cef24b4878bfa'><SiNotion className='icons'/></a>
                    </div>
                    <p>@Copyright LCS. All right reserved.</p>
                </div>
            </div>
        </div>
    </MobileSideBar> : undefined}
    {guide > 0 ? <Guide guide={guide} setGuide={setGuide}/> : undefined}
    <NavBarStyle>
        <div className='main_title'>
            <Link to='/' onClick={() => {
                clear()
            }}>쓰위치</Link>
        </div>
        <div className='header'>
            <div>커뮤니티
                <div className='drop community'>
                    <li onClick={() => {
                        navigate('/community/forum')
                        clear()
                        }}>자유게시판</li>
                </div>
            </div>
            <div>고객센터
                <div className='drop'>
                    <a href='http://pf.kakao.com/_puDuxj/chat' target='_black'><li>채팅상담</li></a>
                    <li onClick={() => {
                        navigate('/cs/faq')
                        clear()
                        }}>FAQ</li>
                    <li onClick={() => {
                        navigate('/cs/operationpolicy')
                        clear()
                        }}>운영정책</li>
                    <li onClick={() => {
                        setGuide(1)
                        clear()
                        }}>가이드</li>
                </div>
            </div>
            <div>포인트 교환
                <div className='drop'>
                    <li onClick={() => {
                        navigate('/goods')
                        clear()
                        }}>쿠폰교환</li>
                </div>
            </div>
            <div>소식
                <div className='drop news'>
                    <li onClick={() => {
                        navigate('/news/notice')
                        clear()
                        }}>공지사항</li>
                    <li onClick={() => {
                        navigate('/news/event')
                        clear()
                        }}>이벤트</li>
                </div>
            </div>
            {!userInfo.accessToken ?
            <Link to='/login' onClick={clear}>로그인</Link> :
            <div>마이페이지
                <div className='drop'>
                    <li onClick={() => {
                        navigate('/users/profile')
                        clear()
                    }}>내정보</li>
                    {userInfo.role === "ROLE_ADMIN" ? <li onClick={() => {
                        navigate('/admin-users/profile')
                        clear()
                        }}>관리자</li> : undefined}
                </div>
            </div>}
            {!userInfo.accessToken ?
            <Link to='/signup' onClick={clear}>회원가입</Link> :
            <div className='logout' onClick={() => {
                setLogout(true)
            }}>로그아웃</div>}
            <div className='drop_container'></div>
        </div>
            <div className={alarms.length !== 0 ? "red notice" : 'notice'} onClick={() => {
                setNoticeOn(!noticeOn)
            }}><AiOutlineBell/>{alarms.length !== 0 ? alarms.length : undefined}</div>
    </NavBarStyle>
    {logout ?
    <LogoutStyle>
        <div className='view'>
          <div>로그아웃 하시겠습니까?</div>
          <div className='confirm'>
            <div onClick={() => {
                dispatch({type:'LOGOUT'})
                navigate('/')
                setLogout(false)
                clear()
                setAlarms([])
            }}>확인</div>
            <div onClick={() => {
                setLogout(false)
            }}>취소</div>
          </div>
        </div>
    </LogoutStyle> :
    undefined}

    {noticeOn ?
    <Notification>
        {userInfo.accessToken && alarms.length !== 0 ? 
        alarms.map(el => {
            return (
                <div className='flex' key={el.trashCanAlarmId}>
                    <div className='container'>
                        <div className='notice'>비움 요청이 처리되었습니다.</div>
                        <div className='content'>{el.address}</div>
                        <div className='date'>{el.createdAt?.slice(0,10)}</div>
                    </div>
                    <div className='delete' onClick={() => handleDelete(el.trashCanAlarmId)}><BsTrash /></div>
                </div>
            )
        }) : userInfo.accessToken && alarms.length === 0 ?
           <div className='unlogin'>현재 알림이 없습니다.</div> :
        <div className='unlogin'>로그인이 필요한 기능입니다.</div>}
    </Notification> :
    undefined}
    </>
  )
}

export default NavBar

const MobileSideBar = styled.div`

    .logout{
        border: 1px solid black;
        text-align: center;
        font-size: 6vmin;
        margin: 3vh 10vw;
        padding: 1vh 2vw;
        background-color: lightgray;
    }

    .side_bar_back{
        position: fixed;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        white-space: nowrap;
        top: 6vh;
        bottom: 0;
        left: 0;
        right: 0;

        li{
            cursor: pointer;
        }
    }

    *{
        font-size: 4.5vmin;
        text-decoration: none;
        color: black;
    }

    .etc{
        position: fixed;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 75vw;

        a{
            margin: 0 3vw;
            font-size: 10vmin;
            padding: 0 .5vw;
        }

        .icons{
            font-size: 10vmin;
            margin-bottom: -1vh;
        }

        p{
            margin-bottom: 5vh;
            font-size: 60%;
        }
    }

    .section{
        display: flex;
        padding-bottom: 3vh;
        padding-top: 1vh;
        border-bottom: .1rem solid black;
    }

    .title{
        width: 30vw;
        padding-left: 3vw;
        margin-top: 1vh;
    }

    .first{
        padding-top: 3vh;
    }

    .side_bar_view{
        align-items: center;
        background-color: white;
        width: 75%;
        height: 100%;
        li{
            list-style: none;
            padding: 1vh 0;
        }
    }

`

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
    white-space: nowrap;

    .view{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    width: 70vw;
    height: 30vh;
    border-radius: 1rem;
    font-size: 6vmin;

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
    font-family: 'Jua', sans-serif;

    a{
        text-decoration: none;
        color: black;
    }

    .logout{
        cursor: pointer;
    }

    .drop{
        font-family: 'Jua', sans-serif;
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
        background-color: #F2F2F2;
        border-left: 3px solid rgb(71,182,181);
        border-bottom: 3px solid rgb(71,182,181);
        width: 86%;
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
        font-family: 'Gugi', cursive;
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

    .red{
        color: red;
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

const Notification = styled.div`
    position: absolute;
    border: 1px solid black;
    width: 320px;
    height: 50vh;
    right: 0;
    background-color: white;
    z-index: 2;
    white-space: nowrap;
    overflow-y: scroll;
    overflow-x: hidden;

    .unlogin{
        border: 5px solid #F1C164;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2vmin;
        margin-top: 2vh;
    }

    .flex{
        display: flex;
    }

    .container{
        border: 1px solid black;
        margin: 1vh 1vw;
        padding: 0.5vh 0.5vw;
        width: 250px;
        div{
            margin: 0.5vh 0;
        }
    }

    .notice{
        font-size: 20px;
    }

    .content{
        font-size: 13px;
    }

    .delete{
        border: 1px solid red;
        display: flex;
        align-items: center;
        margin: 1vh 0;
        margin-left: -1vw;
        cursor: pointer;

        :hover{
            background-color: red;
        }
    }
`

const MobileNavBar = styled.div`
    display: none;
    width: 100%;
    background-color: white;
    border-bottom: 3px solid rgb(71,182,181);
    position: fixed;
    top: 0;
    z-index: 11;
    

    .main_title{
        width: 80%;
        display: flex;
        justify-content: center;
        font-size: 8vmin;
        font-family: 'Gugi', cursive;
        font-weight: bold;

        a{
            text-decoration: none;
            color: rgb(71,182,181);
        }
    }

    .menu_icon{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2vh 3vw;
        cursor: pointer;
    }

    .search_bar{
    display: flex;
    align-items: center;
    flex-grow: 1;
    }

    .login{
        font-size: 4vmin;
        white-space: nowrap;
        margin-right: 6vw;
        padding: .5vh 1vw;
        color: white;
        background-color: #3F4E4F;
    }

    @media screen and (max-width: 600px){
        display: block;
    }
`