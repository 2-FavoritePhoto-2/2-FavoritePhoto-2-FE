> [![Typing SVG](https://readme-typing-svg.demolab.com?font=Poppins&weight=900&size=46&pause=1000&color=F7D511&vCenter=true&width=435&lines=pikapick+photo)](https://git.io/typing-svg)

> 2024.11.15 - 12.09
> ## 코드잇 스프린트 풀스택 2기 중급 프로젝트 2팀 (Frontend)
> [Backend Github 바로가기 🔗](https://github.com/2-FavoritePhoto-2/2-FavoritePhoto-2-BE)
> 
<br />

![랜딩01](https://github.com/user-attachments/assets/058a430f-2382-45c1-8599-27922dc17067)

![랜딩02](https://github.com/user-attachments/assets/7c149550-721d-45e7-be26-2e3720a49b91)

![랜딩03](https://github.com/user-attachments/assets/71f04101-1647-48f0-a9eb-99fc89fdb6b7)


 
## 💡 결과물

- 피카픽포토 홈페이지: https://pikapick-photo.kro.kr
- 🗂️ 팀 문서: https://www.notion.so/2-135c4cf223fc804a827de53230da2422?pvs=4
- 🔍 API 명세: https://pikapick.onrender.com/api/docs

  
<br />

## 🛠️ 기술스택

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)

![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white) <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=green"> <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=green">

![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white) ![notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

## 💁 구성원

|                       양가현                      |                     서유림                     |                     방신철                     |                     김윤서                     |
| :------------------------------------------------: | :--------------------------------------------: |:--------------------------------------------: | :--------------------------------------------: | 
|![102293d61](https://github.com/user-attachments/assets/6dd2f9e4-9fd9-4ae7-9691-8ebf59155b5e)|![image](https://github.com/user-attachments/assets/c08fed97-9cf2-4a9e-a39b-e72c9928e132)|![9d25e22c3](https://github.com/user-attachments/assets/3f888f9c-17ab-4af2-ac71-87c541eded85)| ![57438e292](https://github.com/user-attachments/assets/f9851293-cbb1-45a0-a2d5-024e8b1845fd)|
| [가현's 깃허브](https://github.com/gahyeon-yang) | [유림's 깃허브](https://github.com/Seo-Yurim) |[신철's 깃허브](https://github.com/bangsinchur) | [윤서's 깃허브](https://github.com/hello-yoon)  |

양가현
- 2팀 팀장
- README 담당
- 배포 관리, 팀 스케쥴 관리

서유림
- 프론트엔드 파트장
- 최종 발표 PPT 제작

방신철
- 프로젝트 시연 영상 제작

김윤서
- 팀 노션 문서 관리

## 📋 팀원별 구현 기능 상세

# 📸 포토 카드 프로젝트

## 🛠️ 주요 기능  
> 아래의 타이틀과 각 세부 항목(페이지, 모달, 주요 기능)을 클릭하면 내용을 확인할 수 있습니다.

---

### 1. 양가현
### 🎨 **포토 카드 상점 및 판매자 관련 기능**
<details>
<summary>페이지</summary>

- **마켓플레이스 페이지**  
- **판매 등록 성공/실패 페이지**  

</details>

<details>
<summary>모달</summary>

- **판매 등록 모달**  
- **포토 카드 수정/판매 취소 모달**  
- **교환 승인/거절 모달**  
- **로그인 필요 모달**  

</details>

<details>
<summary>주요 기능</summary>

- **상점 관리**:  
  - 상점에 등록된 카드 리스트 조회  
  - 검색, 필터(등급, 장르, 설명, 매진 여부 등), 정렬(최신/오래된 순, 낮은/높은 가격 순)  
  - 무한 스크롤링  

- **포토 카드 판매**:  
  - 판매 등록  
  - 판매 정보 수정 및 판매 취소  

- **교환 승인/거절**:  
  - 교환 요청 목록 조회  
  - 교환 제안 승인/거절 처리
 
- **알림 UI**:  
  - 포토 카드 거래와 관련된 알림 제공 (구매 완료, 판매 성사, 교환 승인 등)  
  - 알림 표시 형식:  
    - 1시간~23시간: 시간 단위 표시 (예: 1시간 전)  
    - 24시간~6일: 일 단위 표시 (예: 1일 전)  
    - 7일~3주: 주 단위 표시 (예: 1주일 전)  
    - 4주~11개월: 월 단위 표시 (예: 1개월 전)  
    - 12개월 이상: 년 단위 표시 (예: 1년 전)  

</details>
<details>
<summary>컴포넌트</summary>

- **모달 컴포넌트**  
  - 확인 모달:  
    - 로그인 필요  
    - 구매하기  
    - 교환 제시 취소  
    - 교환 제시 거절  
    - 교환 제시 승인  
    - 판매 내리기  
- **공통 컴포넌트**  
  - 드롭다운  
  - 검색  
  - 모달 레이아웃  
  - 성공/실패 페이지  

</details>

---

### 2. 서유림
### 🧸 **내 포토 카드 및 판매 카드 관련 기능**
<details>
<summary>페이지</summary>

- **마이갤러리 페이지**  
- **포토 카드 등록 페이지**  
- **판매 카드 페이지**  
- **등록 성공/실패 페이지**  

</details>

<details>
<summary>모달</summary>

- **판매 등록 모달**  

</details>

<details>
<summary>주요 기능</summary>

- **구매한 포토 카드 관리**:  
  - 필터, 정렬, 검색, 페이지네이션 지원  
  - 구매한 포토 카드 전체 조회  

- **포토 카드 등록**:  
  - 카드 생성 및 세부 정보 입력  
  - 이름, 최소 가격, 등급, 총 발행량, 장르, 설명 등  

- **판매 카드 관리**:  
  - 판매 상태, 교환 상태 관리  
  - 동일 카드의 일부 판매/교환 구분  

</details>
<details>
<summary>컴포넌트</summary>

- **카드 컴포넌트**  
  - 포토 카드: 상점, 마이갤러리, 내가 제시한 교환목록, 교환 제시 카드  
- **모달 컴포넌트**  
  - 판매하기  
  - 수정하기  
- **공통 컴포넌트**  
  - input / textarea  
- **기타**  
  - 등급 카테고리 컴포넌트  

</details>


---

### 3. 방신철
### 🔄 **포토 카드 상세 및 구매, 교환 기능**
<details>
<summary>페이지</summary>

- **판매 중인 포토 카드 상세 페이지**  
- **구매 성공/실패 페이지**  
- **교환 제시 성공/실패 페이지**  

</details>

<details>
<summary>모달</summary>

- **교환 제시 모달**  
- **교환 제시 취소 모달**  

</details>

<details>
<summary>주요 기능</summary>

- **포토 카드 구매**:  
  - 매진되지 않은 포토 카드를 포인트로 구매  
  - 구매자의 포인트 차감 및 판매자의 포인트 적립  

- **교환 제시**:  
  - 특정 카드에 교환 제안서를 발송  
  - 판매자가 교환 승인 시 카드 소유권 변경  

- **상세 정보 조회**:  
  - 포토 카드의 상세 정보(이름, 등급, 가격 등) 확인  
  - 연관 상품도 카드 형식으로 표시  

</details>
<details>
<summary>컴포넌트</summary>

- **카드 컴포넌트**  
  - 세부 정보 카드:  
    - 상품 정보(구매자 기준)  
    - 상품 정보(판매자 기준)  
    - 내 카드 상세  
    - 판매 시 입력 정보  
- **모달 컴포넌트**  
  - 교환하기  
- **공통 컴포넌트**  
  - 수량 조절  

</details>

---

### 4. 김윤서 
### 🎁 **인증 및 알림, 포인트 획득 기능**
<details>
<summary>페이지</summary>

- **로그인, 회원가입 페이지**  

</details>

<details>
<summary>모달</summary>

- **로그인/회원가입 오류 모달**  
- **포인트 획득 이벤트 모달**  

</details>

<details>
<summary>주요 기능</summary>

- **인증 기능**:  
  - 회원가입, 로그인/로그아웃  
  - 로그인 시 nav바에 유저 프로필 표시  

- **포인트 획득 기능**:  
  - 랜덤 상자 뽑기를 통해 포인트 적립  

</details>
<details>
<summary>컴포넌트트</summary>

- **모달 컴포넌트**  
  - 랜덤 포인트 획득  
  - 프로필  
- **기타**  
  - Nav 컴포넌트  

</details>

---

## 🍰 프로젝트 회고

- 발표 자료:
- 시연 영상: 


## 📁 파일 구조
<details>
<summary>📁 파일 구조 보기</summary>

 
```

📦components
 ┣ 📂Common
 ┃ ┣ 📂CardInfo
 ┃ ┣ 📂Dropdown
 ┃ ┃ ┗ 📂Sort
 ┃ ┣ 📂Grade
 ┃ ┣ 📂Input
 ┃ ┣ 📂Modal
 ┃ ┣ 📂Pagination
 ┃ ┣ 📂PhotoCard
 ┃ ┣ 📂Profile
 ┃ ┣ 📂Quantity
 ┃ ┣ 📂RandomBox
 ┃ ┣ 📂SearchBar
 ┃ ┗ 📂SuccessFail
 ┣ 📂CreateCard
 ┣ 📂Landing
 ┣ 📂MyGallery
 ┣ 📂MyShop
 ┗ 📂PocketPlace
📦hooks
📦pages
 ┣ 📂auth
 ┣ 📂card
 ┃ ┗ 📂[id]
 ┣ 📂myGallery
 ┃ ┗ 📂[id]
 ┣ 📂myShop
 ┣ 📂pocketPlace
 ┣ 📂SuccessFail
 ┣ 📜404.js
 ┣ 📜index.js
 ┣ 📜randomtest.js
 ┣ 📜_app.js
 ┗ 📜_document.js
 📦public
 ┣ 📂assets
 ┣ 📂fonts
 ┗ 📜favicon.ico
 📦styles
 
```

