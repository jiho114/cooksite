import React, {useContext} from 'react';
import { DataContext } from '../App';
import { useParams } from 'react-router-dom';


const Recipe = () => {
  const {data, loading} = useContext(DataContext);
  const {id} =useParams();
  const recipe= data ? data.find((item) => item.RCP_SEQ===id):null;
  if(loading) {
    return <h1>데이터 로드 중입니다.</h1>
  }
  if(!recipe) {
    return <h1>찾는 레시피가 없습니다.</h1>
  }

  const {RCP_NA_TIP, RCP_NM,RCP_PARTS_DTLS, INFO_ENG , INFO_FAT, INFO_NA,ATT_FILE_NO_MK, INFO_CAR, INFO_PRO } = recipe;

  const manuals=Array.from({length: 20}, (_, i)=>({ // _ 사용하지 않지만 인덱스는 사용하고자 할때
    desc:recipe[`MANUAL${String(i+1).padStart(2, '0')}`] ,
    //padStart(2, '0') 두자리 변환해서 01, 02
    img: recipe[`MANUAL_IMG${String(i+1).padStart(2, '0')}`]
  })).filter((manual)=>manual.desc) // 설명이 존재하는 항목만 필터링, 설명이 없으면 배열에서 제외해

  const source = RCP_PARTS_DTLS ? RCP_PARTS_DTLS.split("●").map((el) =>el.split(":").map((el)=>el.trim()).filter(Boolean) ).filter((el)=>el.length) : [];

  //RCP_PARTS_DTLS.split("●") 첫 번째 분리 기준(●) 
  //el.split(":")두번째 분리 기준(:)
  //(el)=>el.trim() 각요소의 양옆의 공백 제거
  //filter(Boolean)빈값이 있는 요소 제외
  //filler((el)=>el.length)빈배열은 제외
  // []빈배열 반환
  return (
    <div className='recipeDetail'>
      <img src={ATT_FILE_NO_MK} alt={RCP_NM} className='recipeDetailMainImg' />
      <div className="recipeDetailTitle">{RCP_NM}</div>
      <div className="recipeDetailInfo">
        <div className="info-title">
          재료
        </div>
        {
          source.map((el,idx)=>(
            <div key={idx} className='txt'>
              <span className="source-tit">{el[0]}</span>
              <span className="source-con">{el[1]}</span>
            </div>
          ))
        }

        
      </div>
      <div className="recipeDetailInfo1">
          <div className="info-title1">
            조리법
          </div>
          {
            manuals.map((manual, index)=>manual.desc? (
              <div key={index} className='desc_list'>
                <span className="desc-txt">{manual.desc}</span>
                <img src={manual.img} alt={RCP_NM} />
              </div>
            ):null)
          }
        </div>
        <div className="recipeDetailInfo2">
          <div className="info-title2">
            영양정보
          </div>
          <div className="table">
            <div className="row">
              <span className="col">열 량 : </span>
              <span className="col">{INFO_ENG} kal</span>
            </div>
            <div className="row">
              <span className="col">탄 수 화 물 : </span>
              <span className="col">{INFO_CAR} g</span>
            </div>
            <div className="row">
              <span className="col">단 백 질 : </span>
              <span className="col">{INFO_PRO} g</span>
            </div>
            <div className="row">
              <span className="col">지 방 : </span>
              <span className="col">{INFO_FAT} g</span>
            </div>
            <div className="row">
              <span className="col">나 트 륨 : </span>
              <span className="col">{INFO_NA} g</span>
            </div>
            <div className="tip">
              <span className="col">조리법 TIP :</span>
              <span className="col">{RCP_NA_TIP}</span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Recipe;