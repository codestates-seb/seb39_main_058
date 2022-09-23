import React, { useState } from 'react';
import styled from "styled-components";
import { GiCancel } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";

const list = [
  {
    id: 1,
    title: "제목입니다 제목입니다 제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다",
    user: "우투더영투더우",
    updateAT: new Date().toLocaleDateString('ko-KR'),
    views: 0,
    suggestion: 0
  },
  {
    id: 2,
    title: "제목입니다????",
    user: "짱구는 못말려",
    updateAT: new Date().toLocaleDateString('ko-KR'),
    views: 0,
    suggestion: 0
  },
  {
    id: 3,
    title: "제목입니다 제목입니다 제목입니다",
    user: "어떻게이별까지사랑하겠어널사랑하는거지",
    updateAT: new Date().toLocaleDateString('ko-KR'),
    views: 0,
    suggestion: 0
  },
  {
    id: 4,
    title: "제목입니다 제목입니다",
    user: "취기를 빌려 오늘 너에게 고백할거야",
    updateAT: new Date().toLocaleDateString('ko-KR'),
    views: 0,
    suggestion: 0
  }
]

const tag = ["태그1", "태그2", "태그3", "태그4"]

// 커뮤니티 게시판 리스트가 나오는 메인페이지
function CommunityPage() {

  const [tags, setTags] = useState([])

  const filteredTag = (value) => {
    if(tags.includes(value) === true || value === '태그를 선택해주세요'){
      setTags(tags)
    }else{
      setTags([...tags, value])
    }
  }

  const deleteTag = (value) => {
    let result = tags.filter(el => {
      return el !== value
    })

    setTags(result)
  }

  return (
    <CommunityPageStyle>
      <div className='title_container'>
        <p>자유게시판</p>
      </div>
      <div className='btn'>
        <span className='list'>목록</span>
        <span className='write'>글쓰기</span>
      </div>
      <div className='select_container'>
        <select onChange={(e) => {
          filteredTag(e.target.value)
        }}>
          <option>태그를 선택해주세요</option>
          {tag.map(el => <option key={el} value={el}>{el} </option>)}
        </select>
        {tags.length === 0 ? <div className='notice'> 태그 기능을 이용해 검색을 할 수 있습니다.</div> : undefined}
        {tags.map(el => {
          return (
            <div className='tags_container' key={el}>
              <div className={el === "태그1" ? "red" :
                   el === "태그2" ? "orange" :
                   el === "태그3" ? "blue" :
                   el === "태그4" ? "green" :
                   undefined}> {el}
              </div>
              <GiCancel className='cancle_icon' onClick={() => {
                deleteTag(el)
              }} />
            </div>)})}
      </div>
        <div className='tag_search'> <AiOutlineSearch/> 태그 검색</div>
        <div className='bords_container'>
          <div className='bords_list'>
            <span className='id'>번호</span>
            <span className='title'>제목</span>
            <span className='user'>글쓴이</span>
            <span className='updateAT'>등록일</span>
            <span className='views'>조회</span>
            <span className='suggestion'>추천</span>
          </div>
          {list.map(el => {
            return(
              <div key={el.id} className="bords_list">
                <span className='id'>{el.id}</span>
                <span className='title'>{el.title}</span>
                <span className='user'>{el.user}</span>
                <span className='updateAT'>{el.updateAT}</span>
                <span className='views'>{el.views}</span>
                <span className='suggestion'>{el.suggestion}</span>
              </div>
            )
          })}
        </div>
        
    </CommunityPageStyle>
  )
}

export default CommunityPage

const CommunityPageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10vh;

  .title_container{
    width: 80vw;
    height: 7vh;
    display: flex;
    align-items: center;
    font-size: 4vmin;
    font-weight: bold;
    background: linear-gradient(-45deg, #037E99 65%, #065068 35%);
    color: white;
    border-radius: 20px;

    p{
      margin-left: 2vw;
    }
  }

  .btn{
    width: 80vw;
    height: 5vh;
    margin-top: 1vh;
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 1.6vmin;
    span{
      padding: 0.5rem 1rem;
      margin: 0 .5vw;
      border: 1px solid #413F42;
      box-shadow: 3px 1px 5px rgba(0,0,0,11);
      border-radius: 10px;
    }

    .list{
      background-color: white;
      :hover{
        font-weight: bold;
        font-size: 105%;
      }
    }

    .write{
      background-color: #413F42;
      color: white;
      :hover{
        font-weight: bold;
        font-size: 105%;
      }
    }
  }

  .select_container{
    background-color: #F5F5F5;
    width: 80vw;
    margin-top: 1vh;
    height: 6vh;
    display: flex;
    align-items: center;
    font-size: 2vmin;

    select{
      margin: 0 1vw;
    }
  }

  .red{
    background-color: tomato;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .orange{
    background-color: orange;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .blue{
    background-color: skyblue;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .green{
    background-color: green;
    padding: .3vh .7vw;
    color: white;
    margin: 0 .5vw;
    border-radius: .5rem;
  }

  .tag_search{
    border: 1px solid black;
    margin-top: 1vh ;
    padding: 0.5vh 1vw;
    font-size: 1.5vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    :hover{
      background-color: lightgray;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .tags_container{
    display: flex;
  }

  .cancle_icon{
    margin-top: -1vh;
    margin-left: -.5vw;
    font-size: 2vmin;
    cursor: pointer;
    color: darkgrey;
    :hover{
      color: black;
    }
  }

  .notice{
    font-size: 2vmin;
  }

  .bords_container{
    width: 80vw;
    height: 80vh; // 한페이지에 몇개 들어오나 봐서 수정할거임
    margin-top: 2vh;
    font-size: 1.5vmin;
    /* border: 3px solid red; */
  }

  .bords_list{
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2vh;
    padding: 1vh 0;
    
    span{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .id{
    width: 8%;
    text-align: center;
  }

  .title{
    width: 50%;
    margin: 0 3%;
  }

  .user{
    width: 15%;
  }

  .updateAT{
    width: 11%;
  }

  .views{
    width: 8%;
    text-align: center;
  }

  .suggestion{
    width: 8%;
    text-align: center;
  }

`