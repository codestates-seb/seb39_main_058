import React, { useEffect } from "react";
import { data } from '../data';

const { kakao } = window;

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
        center: new kakao.maps.LatLng(37.541, 126.986),
        level: 5
    };

    const map = new kakao.maps.Map(container, options);

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
        
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition((position) => {
            
            for(let i = 0; i < data.length; i++) {
                const lat = data[i].위도;
                const lon = data[i].경도;
                
                const lati = position.coords.latitude; // 위도
                const long = position.coords.longitude; // 경도
                
                const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                const curPosition = new kakao.maps.LatLng(lati,long);
                const message = `<div style="padding:10px;">${data[i].장소}</div>`; // 인포윈도우에 표시될 내용입니다
                const curMessage = '<div style="padding:10px;">현재 위치입니다.</div>'
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);
                displayMarker(curPosition, curMessage);
            }                
          });
        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        const locPosition = new kakao.maps.LatLng(37.541, 126.986)    
        const message = 'geolocation을 사용할 수 없습니다.'
            
        displayMarker(locPosition, message);
    }
    
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
    
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
        }); 
        
        const iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;
    
        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });
        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, marker);
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);      
    }    
  }, []);

//   useEffect(() => {
//       fetch('https://api.odcloud.kr/api/15038108/v1/uddi:ab54628a-357c-429f-868c-b7c59d7419bc?page=1&perPage=10&serviceKey=JLEKtRKG4tdEBz4y7sC%2FevNdcgS0EiQ9jhzT%2Bt2pQyQdZyGO0DtMfVGTiosROFjB%2BgYobwwT2wuL5nIXoT4tQA%3D%3D')
//         .then(res => res.json())
//         // .then(data => console.log(data.data[1]))
//         .then(data => {
//             for(let prop of data.data[1]) {
//                 console.log(prop)
//             }
//         })
//         .catch(err => err)
//   }, [])


  return (
    <div id='map' style={{
        width: '100%',
        height: '92vh'
    }}></div>
  );
};

export default KakaoMap;