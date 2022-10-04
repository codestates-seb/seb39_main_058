import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BiRightArrow } from 'react-icons/bi';
import { FcLikePlaceholder, FcLike, FcLock } from 'react-icons/fc';
import { BsTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { ImWarning } from 'react-icons/im';
import CommunityAnswer from '../../components/CommunityAnswer/CommunityAnswer';

const tags = ["구로구", "강남구", "관악구", "동작구", "마포구"];

// 특정 질문을 눌렀을 때 나오는 세부 페이지
function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userInfo = useSelector(state => state.LoginPageReducer.userinfo);
  
  const [ data, setData ] = useState({});
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ userName, setUserName ] = useState("");
  const [ userId, setUserId ] = useState("");
  const [ like, setLike ] = useState(0);
  const [ secret, setSecret ] = useState("");
  const [ tag, setTag ] = useState([]);

  const [ remove, setRemove ] = useState(false);
  const [ revise, setRevise ] = useState(false);
  
  const [ dateCreated, setDateCreated ] = useState("");
    // 서버 날짜 기반 customizing
    const createdDate = new Date(dateCreated);
    const year = createdDate.getFullYear();
    const month = createdDate.getMonth() + 1;
    const date = createdDate.getDate();
    const hours = createdDate.getHours();
    const minutes = createdDate.getMinutes();
    const today = ['(일)','(월)','(화)','(수)','(목)','(금)','(토)'];
  
  // 특정 게시글 조회
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
        setUserId(data.data.userId);
        setLike(data.data.forumLike);
        setSecret(data.data.secret);
        setTag(data.data.tag.split(',').slice(1));
        setDateCreated(data.data.dateCreated);
      })
      .catch(err => console.log(err))
  },[]);
  
  const revisedBoard = {
    "forumId" : id,
    "forumTitle" : title,
    "forumText" : content,
    "tag" : tag.join(','),
    "secret" : secret,
  };

  const likeBoard = {
    "forumId" : id,
    "userId" : userInfo.userId,
  }

  const backToBoard = () => navigate("/community/forum");

  // 게시글 '좋아요' 버튼 
  const addLike = () => {
    if(!like) setLike(like + 1)
    // console.log(like)
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/take/like`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(likeBoard)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  // 게시글 '좋아요' 취소버튼
  const disLike = () => {
    if(like) setLike(0);

    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/take/like/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(likeBoard)
    })
      .then(res => res.json())
      .then((data)=>{
        if(data.error==='Unauthorized'){
          alert('세션이 만료되었습니다.')
          navigate('/login',{state: {path:location.pathname}})
        }
      })
      .catch(err => console.log(err))
  }

  // 게시글 수정 및 수정 확인 버튼
  const reviseBoard = () => setRevise(!revise);
  const confirmRevise = () => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/take/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(revisedBoard)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    navigate("/community/forum");
    window.location.reload();
  }
  
  // 게시글 수정(모달창) 취소
  const cancelRevise = () => {
    setRevise(!revise);
  }

  // 게시글 삭제 및 삭제 확인 버튼
  const deleteBoard = () => setRemove(!remove); 
  const confirmRemove = () => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/take/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${userInfo.accessToken}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then((data)=>{
        if(data.error === 'Unauthorized') {
          alert('세션이 만료되었습니다.')
          navigate('/login',{state: {path:location.pathname}})
        }
      })
      .catch(err => console.log(err))
    navigate("/community/forum");
    window.location.reload();
  }

  // 태그 삭제
  const deleteTag = (el) => {
    const filteredTag = tag.filter(tag => tag !== el);
    setTag(filteredTag);        
  }
    
  // 특정 태그 선택
  const selectTag = (e) => {
    if(tags.includes(e.target.value)) {
      setTag([...tag, e.target.value]);
    }
    if(tag.includes(e.target.value)) {
      setTag(tag);
    }
  }

  // 비밀글 여부 선택
  const handleSecret = () => {
    if(secret === "OPEN") {
      setSecret("SECRET");
    } else if (secret === "SECRET") {
      setSecret("OPEN");
    }
  };

  // console.log(userInfo)
  // console.log(data)

  return (
      <>
        <Main>
          <div className="header-wrapper">
            <div className="back-to-board" onClick={backToBoard}>자유게시판<BiRightArrow/></div>
            {/* 게시글 제목 */}
            <Title>
              {revise ? 
                <input autoFocus type="text" value={title} 
                  onChange={(e) => setTitle(e.target.value)}>
                </input> : 
                <div className="title-container">
                  <div>{title}</div>
                  {userInfo.userName === userName && <BsTrashFill className="delete-btn" onClick={deleteBoard}/>}
                </div>}
            </Title>
              
            {/* 게시글 작성자 및 날짜 정보 */}
            <UserInfo>
              <img className='user-profile' src="/profile.png" alt='profile'/>
              <ul>
                <li>{userName}</li>
                <li>{year}년 {month}월 {(hours + 9) > 24 ? date + 1 : date}일 {(hours + 9) > 24 ? today[createdDate.getDay() + 1 ] : today[createdDate.getDay()]}</li>
                <li>{(hours + 9) > 24 ? hours - 15 : hours + 9}시 {minutes}분</li>
              </ul>
              
              {/* 비밀글 여부 : secret === "SECRET"을 secret === "OPEN"으로 바꾸기 */}
              {secret === "SECRET" && 
                <div className="secret">
                  <span><FcLock className="lock"/>해당 글은 비밀글입니다.</span>
                </div>}
                { !tag.join().length ? undefined : 
                  !revise && <div className="tag-container"> 
                  {tag.map(item => <span key={item} className="tag">{item}</span>)}
                </div>}
              </UserInfo>
          </div>

          {/* 게시글 제목 */}
          <Content>
            {revise ?  
              <textarea id="content" value={content} 
                onChange={(e) => setContent(e.target.value)}>
              </textarea> :
              <div className="content">
                {content.replace(/(?:\r\n|\r|\n)/g, '<br/>').split('<br/>').map(item => <p key={item}>{item}</p>)}
              </div>}
          </Content>
          
          {/* 게시글 태그 수정/삭제 */}
          { revise && <SelectedTag>
              {!tag.join().length ? undefined : 
              <div className="selected-tags">
                  { tag.map( el =>
                    <span className="tag" key={el}>{el} 
                        <span className="tag delete-tag" onClick={() => deleteTag(el)}>X</span>
                    </span>)
                  }
              </div>}    
            </SelectedTag>}

          {/* 수정으로 인한 태그 선택 */}
          { revise && <BoardTag>
            <select name="tags" onChange={ e => selectTag(e)} >
              <option name="tags">지역 태그를 선택하세요</option>
                {tags.map(tag => 
                  <option key={tag} name="tag" value={tag} >{tag}</option>
                )}
            </select>
          </BoardTag>}

          {/* 비밀글 수정 */}
          { revise && <Secret>
            <input type="checkbox" name="secret" onClick={handleSecret}/>
            <label htmlFor="secret">비밀글</label>
          </Secret> }
          
          {/* 게시글 수정 버튼 및 좋아요 등록/취소 버튼 */}
          { revise ? 
            <RevisedButtonWrapper>
              <button className="writer-submit" onClick={confirmRevise}> 수정하기 </button>
              <button className="writer-cancel" onClick={cancelRevise}> 취소 </button>
            </RevisedButtonWrapper> :
            <ButtonContainer>
              {/* 'like'로 판별하면 안되고, 'userId'가 있는지 여부로 판단해야함. */}
              {!like ? 
              <button className="like-btn" onClick={addLike}>
                <FcLikePlaceholder className="like-btn"/>
              </button> :
              <button className="like-btn" onClick={disLike}>
                <FcLike className="like-btn"/>
              </button>}
              {(userInfo.userName === userName) && 
                <button className="revise-btn" onClick={reviseBoard} > 
                  <BsFillPencilFill  className="revise-btn"/> 
                </button>}
            </ButtonContainer>}
          
          {/* 삭제 모달창 */}
          { remove && <RemoveModal>
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

  input {
    margin: 1rem;
    width: 70vw;
    height: 5vh;
    text-align: center;
    font-size: 3vmin;
  }

  .title-container {
    display: flex;
    justify-content: center;
  }

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
  textarea {

    @media (max-width: 550px) {
      width: 45vw;
    }
    width: 65vw;
    height: 30vh;
    padding: 10px 15px;
    font-size: 2vmin;
    resize: none;
  }
`;

const SelectedTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;    
  border: 1px solid black;
  padding: 10px 0;
  width: 80vw;
  height: 5vh;
  @media (max-width: 550px) {
      width: 55vw;
      height: 7vh;
      font-size: 2vmin;
  }

  .tag {
      margin: 10px;
      padding: 0.5rem;
      border-radius: 10px;
      color: white;
      background-color: rgb(56,217,169);
      font-family: 'Courier New', Courier, monospace;
      &:hover {
          background: rgb(71,182,181);
      }

      .delete-tag {
          margin: 0;
          padding: 3px;
          cursor: pointer;
      }
  }
`

const Secret = styled.div`
  margin-top: 10px;
`;

const BoardTag = styled.div`
  select {
    padding: 0.5rem 1rem;
  }
`;

const RevisedButtonWrapper = styled.div`
  display: flex;

@media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    

    .writer-submit {
        width: 50vw;
        height: 5vh;
        
    }

    .writer-cancel {
        width: 50vw;
        height: 5vh;
        
    }
}

.writer-submit {
    margin: 1rem;
    padding: 1vmin 4vmin;
    border-radius: 1rem;
    border: 1px solid gray;
    background-color: #38d9a9;
    color: white;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: rgb(71,182,181);
        border: 1px solid rgb(71,182,181);
    }
}

.writer-cancel {
    margin: 1rem;
    padding: 1vmin 4vmin;
    border-radius: 1rem;
    border: 1px solid gray;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: black;
        background-color: lightgray;
        border: 1px solid lightgray;
    }
}
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

export const RemoveModal = styled.div`
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