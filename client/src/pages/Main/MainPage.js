import React from 'react';
import styled from 'styled-components';
import KakaoMap from '../../components/KakaoMap';

function MainPage() {

  
  return (
    <div>
      <Test>가까운 쓰레기통 찾기</Test>
      <KakaoMap id='map'/>
    </div>
  )
}

export default MainPage;

const Test = styled.div`
  position: absolute;
  bottom: 0;
  left: 45%;
  z-index: 2;
  background-color: white;
  padding: 10px;
  :hover {
    color: white;
    background-color: gray;
  }
  cursor: pointer;
`;
