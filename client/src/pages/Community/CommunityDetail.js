import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { BiRightArrow } from 'react-icons/bi';
import { FcLikePlaceholder, FcLike, FcLock } from 'react-icons/fc';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { ImWarning } from 'react-icons/im';
import CommunityAnswer from '../../components/CommunityAnswer/CommunityAnswer';

// 특정 질문을 눌렀을 때 나오는 세부 페이지
function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
  
  const [ data, setData ] = useState([]);
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ userName, setUserName ] = useState("");
  const [ like, setLike ] = useState(0);
  const [ secret, setSecret ] = useState("");
  const [ tag, setTag ] = useState("");
  const [ remove, setRemove ] = useState(false);
  
  const [ dateCreated, setDateCreated ] = useState("");
    // 서버 날짜 기반 customizing
    const createdDate = new Date(dateCreated);
    const year = createdDate.getFullYear();
    const month = createdDate.getMonth() + 1;
    const date = createdDate.getDate();
    const hours = createdDate.getHours();
    const minutes = createdDate.getMinutes();
    const today = ['(일)','(월)','(화)','(수)','(목)','(금)','(토)'];
    
  useEffect(() => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/${id}`,{
      headers: { 
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(data => {
        setData(data) // CommunityAnswer 컴포넌트에 props로 전달해준 데이터!
        setTitle(data.data.forumTitle);
        setContent(data.data.forumText);
        setUserName(data.data.userName);
        setLike(data.data.forumLike);
        setSecret(data.data.secret);
        setTag(data.data.tag);
        setDateCreated(data.data.dateCreated);
      })
      .catch(err => console.log(err))
  },[]);

  // console.log(userName); // 글쓴이
  // console.log(userInfo); // 나
  
  const backToBoard = () => navigate("/community/forum");
  const deleteBoard = () => setRemove(!remove); 
  
  const addLike = () => (!like) ? setLike(like + 1) : setLike(0); 

  const reviseBoard = () => {
    console.log('수정하기 버튼!');
    // navigate("/community/create");
  };
  
  // console.log(data);
  
  const confirmRemove = () => {
    console.log('게시글 삭제!');
    // forumId를 delete 요청보내면 된다!
    // navigate("/community/forum");
  }
  return (
      <>
        <Main>
          <div className="header-wrapper">
            <div className="back-to-board" onClick={backToBoard}>자유게시판<BiRightArrow/></div>
            <Title>
              <div>{title}</div>
              {userInfo.userName === userName && <RiDeleteBack2Fill className="delete-btn" onClick={deleteBoard}/>}
            </Title>
            
            <UserInfo>
              <img className='user-profile' src="/profile.png" alt='profile'/>
              <ul>
                <li>{userName}</li>
                <li>{year}년 {month}월 {(hours + 9) > 24 ? date + 1 : date}일 {(hours + 9) > 24 ? today[createdDate.getDay() + 1 ] : today[createdDate.getDay()]}</li>
                <li>{(hours + 9) > 24 ? hours - 15 : hours + 9}시 {minutes}분</li>
              </ul>
             {/* secret === "SECRET"을 secret === "OPEN"으로 바꾸기 */}
             {secret === "SECRET" && 
              <div className="secret">
                <span><FcLock className="lock"/>해당 글은 비밀글입니다.</span>
              </div>}
              {tag && <div className="tag-container"> 
                {tag.split(',').map(item => <span key={item} className="tag">{item}</span>)}
              </div>}
            </UserInfo>
          </div>

          <Content>
            <div className="content">
              {content.replace(/(?:\r\n|\r|\n)/g, '<br/>').split('<br/>').map(item => <p key={item}>{item}</p>)}
            </div>  
          </Content>
          <ButtonContainer>
            <button className="like-btn" onClick={addLike}>
              {!like ? <FcLikePlaceholder className="like-btn"/> : <FcLike className="like-btn"/>}
            </button>
            {(userInfo.userName === userName) && 
              <button className="revise-btn" onClick={reviseBoard} > 
                <BsFillPencilFill  className="revise-btn"/> 
              </button>}
          </ButtonContainer>
          {remove && <RemoveModal>
              <div className="delete-warning">
                <ImWarning className="delete-warning-icon"/>
                <div>삭제 이후 복구할 수 없습니다.</div>
                <div>정말 해당 글을 삭제하시겠습니까?</div>
                <div className="confirm-wrapper">
                  <div className="confirm" onClick={confirmRemove}>확인</div>
                  <div className="cancel" onClick={() => setRemove(!remove)}>취소</div>
                </div>
              </div>
          </RemoveModal>}
        </Main>
        
        <CommunityAnswer data={data}/>
      </>
  )
}

export default CommunityDetail;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95vw;
  height: 100%;
  margin: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
  @media (max-width: 1150px) {
    width: 93vw;
  }
  @media (min-width: 550px) and (max-width: 900px) {
    width: 90vw;
  }

  @media (max-width: 550px) {
    width: 85vw;
    margin: 7px;
    padding-left: 2rem;
  }

  .header-wrapper {
    display: flex;
    flex-direction: column;

    .back-to-board {
      display: flex;
      font-family: Jua, serif;
      color: rgb(70,183,182);
      :hover {
        color: rgb(56,217,169);
        cursor: pointer;
      }
    }

  }
`;

const Title = styled.h1`
  width: 70vw;
  margin: 30px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  font-size: 3.5vmin;
  font-family: Jua, serif;

  .delete-btn {
    padding: 0 20px;
    :hover {
      font-size: larger;
      padding: 0 16.5px;
      cursor: pointer;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin: 5px 1rem;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    @media (max-width: 550px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    height: 5vh;
    padding: 0;
    padding-right: 20px;
    > li {
      font-size: 1.5vmin;
    }
  }

  .secret {
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 2vmin;
    font-weight: bold;
    
    border-left: 1px solid black;
    border-right: 1px solid black;
    
    height: 5vh;
    @media (max-width: 450px) {
      padding: 0 0.5rem;
    }

    span > .lock {
      padding: 0 10px;
    }
  }
  .tag-container{
    @media (max-width: 740px) {
      display: flex;
      flex-direction: column;
    }
    .tag {
      margin: 0.5rem;
      padding: 0.5rem;
      border-radius: 10px;
      color: white;
      background-color: rgb(56,217,169);
      font-family: 'Courier New', Courier, monospace;
      font-size: 1.5vmin;
      &:hover {
        background: rgb(71,182,181);
      }
      @media (max-width: 550px) {
        margin: 1px 0.5rem;
      }
    }
  }

`;

const Content = styled.div`
  margin: 30px;
  font-size: 2vmin;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3vw;
    border: 1px solid black;
    border-radius: 10px;
    width: 60px;
    height: 5vh;
    background-color:  #ffff99;
    cursor: pointer;
    :hover {
      background-color: ivory;
    }
    
    .like-btn, .revise-btn {
      width: 5vw;
      height: 3.5vh;
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
    width: 40vw;
    height: 25vh;
    border-radius: 10px;
    font-family: Jua, serif;
    font-size: 3vmin;
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