/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaQuestionCircle } from "react-icons/fa";
import { FcLike } from 'react-icons/fc';
import { BsPencilSquare } from 'react-icons/bs';
import { HiPencil } from "react-icons/hi";
// import InfiniteScroll from 'react-infinite-scroll-component';



function User() {
    const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
    
    const [ userData, setUserData ] = useState({});
    const navigate = useNavigate();
    const [rank, setRank] = useState(false)
    const [order, setOrder] = useState([])

    useEffect(() => {
        fetch(`https://sswitch.ga/users/profile`, {
            headers: {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setUserData(data.data)
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        fetch(`https://sswitch.ga/orders?id=${userInfo.userId}&page=1&size=10`,{
            headers: {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            setOrder(res.data)
        })
        .catch(err => console.log(err))
    },[])

    let aaa = order.map(el => el.orderGoodsList[0])

    return (
    <Main>
        <div className='wrapper'>
        <TopBackground/>
        <div className='user_info'>
            <div className='user'>
                <div>
                    <div className='img_container' onClick={() => navigate('/users/profile/revise')}>
                        <img src={ !userData.profileImage ? '/profile.png' : userData.profileImage}/>
                        <HiPencil className='edit'/>
                    </div>
                    <div className='flex'>
                        <div className='nickName'>{userInfo.userName}</div>
                    </div>
                </div>
                <div className='detail'>
                    <span className='view_more'>상세보기</span>
                    <div className='detail_content'>
                        <p>이메일 : {userData.email}</p>
                        <p>현재 포인트 : {userData.currentPoints}</p>
                        <p>누적 포인트 : {userData.totalPoints}</p>
                        <p>가입일 : {userData.dateCreated}</p>
                    </div>
                </div>
            </div>
            <div className='rank_container'>
                <div className='flex_box icons'>
                    <span>글 쓴 횟수</span>
                    <BsPencilSquare className='icon'/>
                    <span>3회</span>
                </div>
                <div className='flex_box'>
                    <img src={
                        userData.totalPoints < 10000 ? "/bronze.png" : 
                        userData.totalPoints <= 10000 || userData.totalPoints < 25000 ? "/silver.png" :
                        userData.totalPoints <= 25000 || userData.totalPoints < 50000 ? "/gold.png" :
                        userData.totalPoints <= 50000 || userData.totalPoints < 100000 ? "/platinum.png" :
                        userData.totalPoints >= 100000 ? "/diamond.png" : undefined} />
                    <span>
                        {userData.totalPoints < 10000 ? "브론즈" :
                        userData.totalPoints <= 10000 || userData.totalPoints < 25000 ? "실버" :
                        userData.totalPoints <= 25000 || userData.totalPoints < 50000 ? "골드" :
                        userData.totalPoints <= 50000 || userData.totalPoints < 100000 ? "플래티넘" :
                        userData.totalPoints >= 100000 ? "다이아몬드" : undefined}
                    </span>
                    <span className='more' onClick={() => setRank(true)}><FaQuestionCircle/></span>
                    {rank ?
                    <div className='back' onClick={() => setRank(false)}>
                        <div className='view'>
                            <li>
                                <img src='/bronze.png' />
                                <p>브론즈 : 누적 포인트 10,000 포인트 미만</p>
                            </li>
                            <li>
                                <img src='/silver.png' />
                                <p>실버 : 누적 포인트 10,000 포인트 이상</p>
                            </li>
                            <li>
                                <img src='/gold.png' />
                                <p>골드 : 누적 포인트 25,000 포인트 이상</p>
                            </li>
                            <li>
                                <img src='/platinum.png' />
                                <p>플래티넘 : 누적 포인트 50,000 포인트 이상</p>
                            </li>
                            <li>
                                <img src='/diamond.png' />
                                <p>다이아몬드 : 누적 포인트 100,000 포인트 이상</p>
                            </li>
                        </div>
                    </div> :
                    undefined}
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
                        {order.map(el => {
                            return(
                                <div className='bords_list select' key={el.orderId}>
                                    <span className='his'>{aaa[0].goodsName}</span>
                                    <span className='date'>{el.createdAt}</span>
                                    <span className="point minus">{aaa[0].price}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
        </div>
    </Main>
    )
}

export default User;


const Main = styled.main`
    
    font-size: 3vmin;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 122vh;
    width: 100%;

    .back{
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 10;
        white-space: nowrap;
        .view{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 10vw;
            img{
                width: 20vw;
                height: 20vh;
            }

            li{
                list-style: none;
                display: flex;
                align-items: center;
                p{
                    color: white;
                    margin-left: 5vw;
                    white-space: pre;
                }
            }
        }
    }

    .rank_img{
        width: 30vw;
        height: 20vh;
    }

    .view_more{
        position: absolute;
        font-size: 2vmin;
        top: 2vh;
        right: 4vw;
        background-color: #002B5B;
        color: white;
        padding: .5vh 1vw;
        border: 0.2rem solid #395B64;
        cursor: default;
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

    .detail_content{
        display: none;
        margin-top: -5vh;
    }

    .detail:hover{
        .detail_content{
            display: block;
            position: relative;
            animation: identifier 3s forwards;
            margin-left: -20vw;
            font-size: 2vmin;
            white-space: nowrap;
        }
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

    .user{
        height: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: .3rem solid rgb(64,156,155);

        img{
            width: 18vw;
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

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
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