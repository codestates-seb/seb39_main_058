import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommunityAnswer from '../../components/CommunityAnswer/CommunityAnswer'

// 특정 질문을 눌렀을 때 나오는 세부 페이지
function CommunityDetail() {
  const { id } = useParams();

  const [ comment, setComment ] = useState([]);

  useEffect(() => {
    fetch(`http://ec2-43-200-66-53.ap-northeast-2.compute.amazonaws.com:8080/community/forum/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.data.commentResponses)
        setComment(data.data.commentResponses)
      })
      .catch(err => console.log(err))
  })

  

  return (
      <>
        <div>CommunityDetail</div>
        
        <CommunityAnswer comment={comment} setComment={setComment}/>
      </>
  )
}

export default CommunityDetail