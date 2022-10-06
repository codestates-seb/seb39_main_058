/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ImWarning } from 'react-icons/im';
import { HiPencil } from "react-icons/hi";
import PageNation from '../../components/PageNation';



function AdminUser() {
    const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
    
    const [ trashTotal, setTrashTotal ] = useState();
    // const [ trashData, setTrashData ] = useState();
    const [ userData, setUserData ] = useState({});
    const [ emptyRequest, setEmptyRequest ] = useState([]);
    const [ processed, setProcessed ] = useState(false);
    
    const navigate = useNavigate();
    
    // 관리자 마이페이지 정보
    useEffect(() => {
        fetch(`https://sswitch.ga/users/profile`, {
            headers: {
                "Authorization": `Bearer ${userInfo.accessToken}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setUserData(data.data))
            .catch(err => console.log(err))
    },[])

    // '비워주세요' 요청 정보
    useEffect(() => {
        fetch(`https://sswitch.ga/trash?page=1&size=10`)
        .then(res => res.json())
        .then(data => {
            setTrashTotal(data.pageInfo);
            setEmptyRequest(data.data);
        })
        .catch(err => console.log(err))
    },[])

    const emptyConfirm = () => {
        console.log('처리완료!')
        setProcessed(!processed)
    }

    console.log(trashTotal);

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
                <EmptyRequest>   
                    {emptyRequest.map(trash => {
                        return (
                        <TrashInfo key={trash.trashId}>
                            <div className='info_wrapper'>
                                <div className='address'>주소: {trash?.address}</div>
                                <div className='request_date'>요청일자: {trash?.dateCreated}</div>
                                <div className='address'>쓰레기통 상태: {trash.trashStatus === "FULL" ? "가득찼습니다." : "비워졌습니다."}</div>
                            </div>
                            <ButtonContainer>
                                <button className="empty_confirm" onClick={emptyConfirm}>처리완료</button>
                            </ButtonContainer>
                        </TrashInfo>)
                    })}
                </EmptyRequest>
                <div className='pagenation_wrapper'>
                    <PageNation emptyRequest={emptyRequest} trashTotal={trashTotal?.totalElements} />
                </div>
            </div>

            {/* 쓰레기통 비움요청 확인 모달창 */}
            {processed && <RemoveModal>
                    <div className="delete-warning">
                    <ImWarning className="delete-warning-icon"/>
                    <div>쓰레기통 '비워주세요' 요청에 대해</div>
                    <div>처리 완료하시겠습니까?</div>
                    <div className="confirm-wrapper">
                        <div className="confirm" onClick={emptyConfirm}>확인</div>
                        <div className="cancel" onClick={() => setProcessed(!processed)}>취소</div>
                    </div>
                    </div>
                </RemoveModal>}
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
        top: 9%;
        font-size: 200%;
        display: none;
        @media (max-width: 550px) {
            top: 6%;
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
`;

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

const EmptyRequest = styled.div`
    /* border: 1px solid black; // 삭제 */

    padding: 1rem;
    font-size: 2.5vmin;
`;

const TrashInfo = styled.div`
    /* border: 1px solid red; // 삭제 */

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;

    @media (max-width: 550px) {
        flex-direction: column;
    }
    
    .info_wrapper {
        padding: .5rem .2rem;
        div {
            padding: .3rem 0;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;

   .empty_confirm {
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
    width: 70vw;
    height: 45vh;
    border-radius: 10px;
    font-family: Jua, serif;
    font-size: 4vmin;
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