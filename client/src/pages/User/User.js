import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaQuestionCircle } from "react-icons/fa";
import { FcLike } from 'react-icons/fc';
import { BsPencilSquare } from 'react-icons/bs';
import { HiPencil } from "react-icons/hi";


function User() {
    const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
    
    const [ userData, setUserData ] = useState({});
    const navigate = useNavigate();
    const [rank, setRank] = useState(false)
    const [data, setData] = useState([])

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
        fetch(`https://sswitch.ga/orders?id=${userInfo.userId}&page=1&size=20`,{
            headers: {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    },[])

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
                    <div className='detail_content'>
                        <p>이메일 : {userData.email}</p>
                        <p>현재 포인트 : {userData.currentPoints}</p>
                        <p>누적 포인트 : {userData.totalPoints}</p>
                        <p>가입일 : {userData.dateCreated}</p>
                    </div>
                </div>
            </div>
            <div className='rank_container'>
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
            </div>
            <div className='etc'>
                <div className='history'>
                    <div className='bords_container'>
                        <div className='bords_list header'>
                            <span className='his'>차감 내역</span>
                            <span className='date'>날짜</span>
                            <span className='point'>포인트</span>
                        </div>
                            {data.map(el => {
                                return(
                                    <div className='bords_list select' key={el.orderId}>
                                        <span className='his'>{el.goodsName}</span>
                                        <span className='date'>{el.createdAt}</span>
                                        <span className="point minus">{el.totalPrice}</span>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className='red'>※ 위 표는 포인트 차감 내역만 확인이 가능합니다 ※</div>
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

    .red{
        font-size: 2vmin;
        text-align: center;
        color: red;
    }

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

    .more{
        cursor: pointer;
        margin-top: -1vh;
    }

    .edit{
        position: absolute;
        top: 13%;
        font-size: 200%;
        display: none;
    }

    .detail_content{
        position: relative;
        font-size: 2vmin;
        white-space: nowrap;
    }

    .rank_container{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 40vh;

        @media screen and (max-width: 500px){
            height: 25vh;
        }
        
        img{
            width: 35vw;
            height: 30vh;

            @media screen and (max-width: 500px){
            width: 50vw;
            height: 28vh;
            margin-top: -7vh;
        }
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
        span{
            padding-top: 1vh;
        }
    }

    .icons{
        margin-top: 10vh;
    }

    .bords_container{
        width: 100%;
        font-size: 80%;
        margin-bottom: 5vh;
        border: 0.1rem solid black;
        height: 25vh;
        overflow-y: scroll;
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
            width: 15vw;
            height: 15vh;
            border-radius: 50%;
            margin: 0 3vw;
            padding: 3vh 0;

            @media screen and (max-width: 500px){
            width: 26vw;
        }
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
        width: 60%;
        top: 10vh;
        border-radius: 2%;
        padding: 2rem;
        border: .3rem solid rgb(64,156,155);

        @media screen and (max-width: 500px){
            /* border: none; */
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