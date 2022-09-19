import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

const KakaoMap = () => {

  const [guro, setGuro] = useState([]);
  const [a, setA] = useState(null)
  const [b, setB] = useState(null)

    // 구로구 쓰레기통 API
    useEffect(() => {
        fetch(`https://api.odcloud.kr/api/15087773/v1/uddi:d9bdf233-ee41-46fe-8e08-bb74980f1155?page=1&perPage=292&serviceKey=JLEKtRKG4tdEBz4y7sC%2FevNdcgS0EiQ9jhzT%2Bt2pQyQdZyGO0DtMfVGTiosROFjB%2BgYobwwT2wuL5nIXoT4tQA%3D%3D`)
          .then(res => res.json())
          .then(data => {
              setGuro(data.data);
          })
          .catch(err => err)
    }, [])


  useEffect(() => {

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  navigator.geolocation.getCurrentPosition(function(position) {

    
    var lat = position.coords.latitude, // 위도
    lon = position.coords.longitude; // 경도
    
    setA(lat)
    setB(lon)
    
   var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
       message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
   
   // 마커와 인포윈도우를 표시합니다
   displayMarker(locPosition, message);
       
 });

 function displayMarker(locPosition, message) {
 
   // 마커를 생성합니다
   var marker = new kakao.maps.Marker({  
       map: map, 
       position: locPosition
   }); 
   
   var iwContent = message, // 인포윈도우에 표시할 내용
       iwRemoveable = true;
 
   // 인포윈도우를 생성합니다
   var infowindow = new kakao.maps.InfoWindow({
       content : iwContent,
       removable : iwRemoveable
   });
   
   // 인포윈도우를 마커위에 표시합니다 
   infowindow.open(map, marker);
   
   // 지도 중심좌표를 접속위치로 변경합니다
   map.setCenter(locPosition);  
 
 }
 
 var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
 mapOption = { 
     center: new kakao.maps.LatLng(a,b), // 지도의 중심좌표
     level: 6 // 지도의 확대 레벨
 };
 
 var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
     
 for (var i = 0; i < guro.length; i ++) {
 
   if(guro[i].수거쓰레기종류 === "일반쓰레기"){
     var imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReeucXaXJyGpKj9_JVuYgqmFMjM3G95P7nrA&usqp=CAU"
   }
   if(guro[i].수거쓰레기종류 === "재활용"){
     var imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSELMjukqb3KAZfi3HYGbXleoKEW6ofm1KvkA&usqp=CAU"
   }
     
     // 마커 이미지의 이미지 크기 입니다
     var imageSize = new kakao.maps.Size(24, 35); 
     
     // 마커 이미지를 생성합니다   
 
     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
     
     // 마커를 생성합니다
     var marker = new kakao.maps.Marker({
         map: map, // 마커를 표시할 지도
         position: new kakao.maps.LatLng(guro[i].위도, guro[i].경도), // 마커를 표시할 위치
         title : guro[i].소재지도로명주소, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
         image : markerImage // 마커 이미지 
     });
 }
  }, [guro]);

  return (
    <>
    <div id='map' style={{
        width: '100%',
        height: '92vh'
    }}></div>
    {a === null ? <MapStyle>loding....</MapStyle> : undefined}
    </>
  );
};

export default KakaoMap;

const MapStyle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 35%;
  left: 35%;
  width: 30vw;
  height: 20vh;
  background-color: ivory;
  z-index: 5;
  font-size: 300%;
  font-weight: bold;
`
