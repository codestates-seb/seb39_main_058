import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommunityAnswer from '../../components/CommunityAnswer/CommunityAnswer'

// 특정 질문을 눌렀을 때 나오는 세부 페이지
function CommunityDetail() {
  const { id } = useParams();
  const [ data, setData ] = useState([]);

  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ like, setLike ] = useState(0);
  const [ secret, setSecret ] = useState("");
  const [ tag, setTag ] = useState("");

  useEffect(() => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data) // CommunityAnswer 컴포넌트에 props로 전달해준 데이터!
        setTitle(data.data.forumTitle);
        setContent(data.data.forumText);
        setLike(data.data.forumLike);
      })
      .catch(err => console.log(err))
  },[])
  console.log('title:', title);
  console.log('content:', content);
  

  return (
      <>
        <div>CommunityDetail</div>
        
        <CommunityAnswer data={data}/>
      </>
  )
}

export default CommunityDetail;