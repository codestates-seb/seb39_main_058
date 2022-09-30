import React from 'react';
import styled from "styled-components";

function Guide({guide, setGuide}) {
  return (
    <GuideStyle>
        <button onClick={() => {
            setGuide(guide+1)
        }}>Guide</button>
    </GuideStyle>
  )
}

export default Guide

const GuideStyle = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 2;
`