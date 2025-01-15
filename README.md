# 공공데이터 API를 활용한 요리 레시피 사이트

- 요리 레시피를 한눈에 보기 쉽고 웹 / 반응형 구분 없이 편리하게 찾아볼 수 있도록 음식 레시피 공공 데이터 API를 활용한 요리책 사이트를 만들었습니다.

- 사용한 API : 공공 데이터 포털
- 사용한 언어 : 리액트 Vite
- 사용한 라이브러리 : GSAP, Axios, Swiper

## 요리사이트의 핵심 내용
- useState를 활용한 처음 진입 시 나타나는 Loding 구현
- GSAP을 사용한 Loding 페이지 구현
- axios를 활용한 공공 데이터 API 가지고 오기
- Swiper를 사용한 슬라이드 구현 
- .env 파일 활용과 데이터 API를 vercel에 배포하기

### vercel에 배포를 했는데 에러가 발생했다.
- .env 파일에 API 주소를 넣고 Home.jsx로 가지고 와 사용했는데, 로컬 환경에서는 에러 없이 모든 데이터가 잘 나왔으나 Vercel에 배포하는 순간 데이터가 전부 날아갔다.
- Environment Variables에서 API KEY에 API 키를 넣었지만 데이터가 나오지 않는 에러가 발생했다. 콘솔을 확인해보니 공공 데이터 포털에서 가져온 API가 HTTP를 지원하지 않는다는 내용이 있었다.
- HTTP가 아닌 HTTPS를 지원함을 알게 되어, API를 불러오는 axios 코드의 URL을 HTTPS로 변경하니 데이터가 정상적으로 나왔다.
-로컬 환경에서 작업할 때보다 배포했을 때 발생하는 에러가 많았던 것 같다. 여러 번 코드를 확인하고 수차례 디버깅을 하는 과정이 필요했다는 걸 깨달았다.
- axios로 데이터를 불러오는 게 어려웠었지만 이번 프로젝트를 마친 후 axios에 대해 깊이 알게 되었고, API를 사용할 때의 주의점을 확실히 알게 되었다.
