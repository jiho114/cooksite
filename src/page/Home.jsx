import { useContext, useState } from "react";
import { DataContext } from "../App";
import "../css/Home.css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Home = () => {
  const { data } = useContext(DataContext);
  const limitedData = data.slice(0, 5);
  const limitedData2 = data.slice(5, 15);
  const limitedData3 = data.slice(15, 31);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [isonClick, setIsonClick] = useState(false);

  const handleonClick = () => {
    setIsonClick(true);
  };

  const handleonClose = () => {
    setIsonClick(false);
  };

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="home">
      <div className="homeNav">
        <h2>COOK RECIPE</h2>
      </div>
      <Swiper
        className="homeSlideContainer"
        // install Swiper modules
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 5500, // 슬라이드 간 시간 (ms)
          disableOnInteraction: false, // 사용자가 슬라이드를 조작해도 자동 재시작
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {limitedData.map((item, index) => (
          <SwiperSlide key={index} className="slideBox">
            <div className="recipeCard">
              <div className="recipeCardImg">
                <img src={item.ATT_FILE_NO_MK} alt={item.RCP_NM} />
              </div>
              <div className="recipeCardTxt">
                <h3>{item.RCP_NM}</h3>
                <p>{item.RCP_NA_TIP}</p>
                <button onClick={() => handleCardClick(item)}>
                  자세한 레시피 보러가기
                </button>
              </div>
            </div>
            <div className="icon">
              <div className="iconC">
                <span>{item.INFO_CAR}</span>
                <span>Cal</span>
              </div>
              <div className="iconF">
                <span>{item.INFO_FAT}</span>
                <span>Fat</span>
              </div>
              <div className="iconN">
                <span>{item.INFO_NA}</span>
                <span>Na</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="homeTodayCook">
        <h2>Today Cook</h2>
        <div className="todayCardContainer">
          {limitedData2.map((item, idx) => (
            <div
              className="todayCard"
              key={idx}
              onClick={() => handleCardClick(item)}
            >
              <img src={item.ATT_FILE_NO_MK} alt="" />
              <div className="todayCardTxt">
                <p>{item.RCP_NM}</p>
                <p>{item.RCP_PAT2}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="Toyou">
          <h2>To You : low salt</h2>
          <div className="todayCardContainer">
            {limitedData3.map((item, idx) => (
              <div
                className="todayCard"
                key={idx}
                onClick={() => handleCardClick(item)}
              >
                <img src={item.ATT_FILE_NO_MK} alt="" />
                <div className="todayCardTxt">
                  <p>{item.RCP_NM}</p>
                  <p>{item.RCP_PAT2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="allmenuContainer">
        <button
          onClick={handleonClick}
          style={isonClick ? { display: "none" } : { display: "block" }}
        >
          전체 메뉴 보기
        </button>
        {isonClick ? (
          <div className="allmenu">
            <h2>All Menu</h2>
            <div className="todayCardContainer">
              {data.map((item, idx) => (
                <div
                  className="todayCard"
                  key={idx}
                  onClick={() => handleCardClick(item)}
                >
                  <img src={item.ATT_FILE_NO_MK} alt="" />
                  <div className="todayCardTxt">
                    <p>{item.RCP_NM}</p>
                    <p>{item.RCP_PAT2}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="closeBtn" onClick={handleonClose}>
              전체 메뉴 닫기
            </button>
          </div>
        ) : null}
      </div>
      {selectedRecipe && (
        <div className="recipeDetails">
          <div className="recipeDetailsContent">
            <img src={selectedRecipe.ATT_FILE_NO_MK} alt="" />
            <div className="recipeDetailsTxtBox">
              <div className="recipeDetailsTxt">
              <h3>{selectedRecipe.RCP_NM}</h3>
              <p>{selectedRecipe.RCP_NA_TIP}</p>
              <p>칼로리: {selectedRecipe.INFO_CAR} Cal</p>
              <p>지방: {selectedRecipe.INFO_FAT}g</p>
              <p>나트륨: {selectedRecipe.INFO_NA}mg</p>
              </div>
              <div className="recipeDetailsCookTxt">
                <p>{selectedRecipe.MANUAL01}</p>
                <p>{selectedRecipe.MANUAL02}</p>
                <p>{selectedRecipe.MANUAL03}</p>
                <p>{selectedRecipe.MANUAL04}</p>
                <p>{selectedRecipe.MANUAL05}</p>
                <p>{selectedRecipe.MANUAL06}</p>
                <p>{selectedRecipe.MANUAL07}</p>
            <button onClick={() => setSelectedRecipe(null)}>닫기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
