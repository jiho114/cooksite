import Home from "./page/Home";
import { useState, useEffect, useRef, createContext } from "react";
import { gsap } from "gsap";
import axios from "axios"

export const DataContext =createContext();

function App({children}) {
  //공공데이터
  const API_KEY = import.meta.env.VITE_API_KEY;
  // console.log(API_KEY) 정상적으로 들어옴
  const [data, setData]=useState([]);

  const getDB = async () => {
    //d1d505e5857e48eb9a21	
    try{
      const {data}= await axios.get(`https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/100`);
      setData( data.COOKRCP01.row)
      console.log(data)
      
    }catch(err){
      console.error('데이터 불러오는데 실패했습니다', err)
    }
  }
  useEffect(()=>{
    getDB();
  }, [])

  //제발되라

  const [isLoading, setIsLoading] = useState(true);
  //로딩 페이지

  //gsap 애니메이션 ref
  const textRef = useRef();
  const waveRef = useRef();
  const wavebgRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      const text = textRef.current;
      const chars = text.innerText.split("");
      text.innerHTML = ""; // 텍스트를 비우고 한 글자씩 추가 (innerText가 아닌 innerHTML을 사용)

      // 각 문자를 span 태그로 감싸기
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        text.appendChild(span);
      });

      // GSAP 애니메이션
      gsap.fromTo(
        text.querySelectorAll("span"),
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 20,
          duration: 0.3,
          stagger: 0.3,
          ease: "easeInOut",
          onComplete: () => setIsLoading(false), // 애니메이션이 끝난 후 상태 변경
        }
      );
    }, 10); // 3초 후에 애니메이션 시작

    return () => clearTimeout(timer); // cleanup 함수
  }, []);

  useEffect(() => {
    const wave = waveRef.current;

    gsap.fromTo(
      wave,
      {
        x: -10,
        opacity: 1,
      },
      {
        x: -100,
        opacity: 1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );
  });

  useEffect(() => {
    const wave = wavebgRef.current;

    gsap.fromTo(
      wave,
      {
        x: 50,
        opacity: 0,
      },
      {
        x: -100,
        opacity: 1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );
  }, []);

  return (
    <DataContext.Provider value={{data}}>
    <>
       {isLoading ? (
        <div className="AppLoding">
          <div className="AppBg1" ref={waveRef}></div>
          <div className="AppBg2" ref={wavebgRef}></div>
          <h1 ref={textRef}>COOK RECIPES</h1>
        </div>
      ) : (
        <Home/> // 애니메이션이 끝나면 '짜잔'이 나옴
      )}
    </>
    </DataContext.Provider>
  );
}

export default App;
