import React from 'react'
import { useEffect } from 'react';
import styled from "styled-components";


const AnswerModal = (props) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
  
  function closeModal() {
    props.closeModal();
   
  }
  return (
  
    <Modal  onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        {/* <button id="modalCloseBtn" onClick={closeModal}>
          
        </button> */}
        {props.children}
       
      </div>
    </Modal>
  )
}

export default AnswerModal
const Modal=styled.div`

position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
    .modalBody {
    position: absolute;
    width: 300px;
    height: 150px;
    /* padding: 40px; */
    /* font-size: 3vmin; */
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    }
    #modalCloseBtn {
      position: absolute;
      top: 15px;
      right: 15px;
      border: none;
      color: rgba(0, 0, 0, 0.7);
      background-color: transparent;
      font-size: 20px;
    }
    #modalCloseBtn:hover {
      cursor: pointer;
    }
 
`

