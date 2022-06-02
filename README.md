# PickMen

<img width="70%" src="img/로고.png"/>

   <br>

## :heart: 개요

PickMen은 모바일 앱으로 같은 대학 내에서 멘토와 멘티를 매칭시켜주는 멘토링 매칭 플랫폼이다.</br></br>
신입생과 저학년 대학생들은 전공 지식과 학교 생활에 대해 알고 싶은데, 물어볼 데가 없거나 정보를 얻을 주체가 동아리나 소학회에만 한정되어 있다.
이를 위해 멘토링 프로그램이 존재하지만, 실제 참여율은 저조하고 멘토링을 의무적으로 참여해야하는 등 부담을 가질 수 있다.</br></br>
PickMen은 **"이러한 멘토링을 모바일 앱으로 보다 쉽고, 자율적으로 제공하면 어떨까?"** 라는 고민에서 시작되었다.</br></br>
멘티는 멘토들의 프로필 리스트로부터 멘토를 선택할 수 있고, 멘토와의 채팅을 통해 대학생들이 원하는 전공 지식 및 학교 생활 등에 대한 정보를 얻을 수 있다.그리고 찾는 멘토가 없다면 원하는 정보를 얻기 위해 구인 게시판에서 멘토를 구할 수 있다.
<br>

## :orange_heart: 기대효과

PickMen은 멘토링 서비스를 앱으로 제공하여 멘토링에 접근하는 것에 대한 부담감을 줄인다. </br>그리고 성적 인증된 멘토를 통한 멘토링 서비스를 통해 대학생들의 전반적인 학습 수준 향상을 기대할 수 있다.</br> 또한, 같은 학교 지역 내 멘토들을 선택할 수 있어 학교, 동네 내에서 유대감 형성 및 학습 효과 기대할 수 있다. </br></br>
$ \Rightarrow $ 같은 학교, 인근 지역 내의 성적표 인증을 바탕으로 한 멘토링 플랫폼을 형성한다
<br>

## :yellow_heart: 시스템 구조

<img width="90%" src="https://user-images.githubusercontent.com/68629997/171659539-db79b600-130b-486f-9497-9b966ef7458f.png"/>

- React-Native
  - Front-end client 구현
    <br>
    <br>
- Spring-Boot
  - Back-end server 구현
    <br>
    <br>
- SockJS
  - 실시간 통신, 채팅을 위해 사용
    <br><br>
- Google Cloud Vision OCR API

  - 이미지에서 텍스트 추출
  - 성적표 인증을 위해 사용
    <br><br>

- Google Maps API

  - 지역에 따른 멘토링 서비스를 위해 사용
    <br><br>

- Firebase
  - 채팅 알림을 위해 사용
    <br>

## :green_heart: 개발 도구 및 버전

- ![react-native-cli](https://img.shields.io/static/v1?label=react-native-cli&message=v2.0.1&color=blueviolet)
- ![react-native](https://img.shields.io/static/v1?label=react-native&message=v0.67.4&color=orange)
- ![npm](https://img.shields.io/static/v1?label=npm&message=v7.6.0&color=skyblue)
- ![spring-boot](https://img.shields.io/static/v1?label=spring-boot&message=v2.6.7&color=bluegreen)
- ![mysql](https://img.shields.io/static/v1?label=mysql&message=v8.0.29&color=blue)

   <br>

## :blue_heart: 외부 API

- [Firebase](https://firebase.google.com/)
- [Google Maps](https://developers.google.com/maps/)
- [Google Cloud Vision API](https://cloud.google.com/vision/docs/ocr?hl=ko)

   <br>

## :purple_heart: 실행 방법

- Clone the repository

```bash
git clone https://github.com/08-PickMen/PickMen_App.git
cd Front
```

- Install with npm

```bash
npm install
```

- Run (Front)

```bash
react-native run-android
```

- Build (Backend)

```bash
cd Backend/backend
./mvnw build
```

- Run (Backend)

```bash
./mvnw bootRun
```

## :heartpulse: 구현 기능

### :question: 멘티

<details>
<summary>1. 회원가입</summary>
<div markdown="1">

   <img width="10%" src="img/학교 선택.PNG"/>
   <img width="10%" src="img/학교 인증.PNG"/>
   <img width="10%" src="img/구글 지도.PNG"/>
  
- 회원가입 시 멘티 선택

- 본인의 학교를 선택

- 전공 선택 및 관심 강의 분야 2개 선택

- 학교 이메일로 인증 진행

- 닉네임 설정 & 프로필 이미지 설정 & 위치 설정

  - 멘티는 성적표를 인증하지 않는다.

  - 멘티의 위치를 Google Maps로 설정할 수 있다.

- 아이디와 비밀번호 설정

</div>
</details>
<details>
<summary>2. 프로필 수정</summary>
<div markdown="1">

😎숨겨진 내용😎

</div>
</details>
<details>
<summary>3. 멘토 탐색</summary>
<div markdown="1">

##### 3.1. 멘토 프로필 탐색

   <img width="30%" src="img/멘토 프로필.PNG"/>

- 멘토 프로필 탭으로 이동

- 멘토 프로필 리스트 확인

  - 기본적으로 멘토들은 로그인한 사용자의 **관심 강의 분야** -> **전공** -> **멘토 평점** 순으로 추천되어 보여진다.

  - 정렬 필터링을 통해 원하는 순으로 멘토들을 정렬할 수 있다.

- 멘토 프로필 정보

  - 멘토의 프로필 이미지 & 닉네임 & 전공 & 전공 강의 분야 리스트 를 보여준다.

- 멘토 상세 프로필 정보

  - 멘토의 프로필을 선택하면 프로필 상세 페이지로 이동한다.

  - 멘토의 소개와 후기를 볼 수 있다.

##### 3.2. 멘티 구인 게시글 탐색 & 멘토 구인 게시글 작성

- 게시판 탭으로 이동

- [멘티구함] 태그가 붙은 게시글을 검색하여 멘토와 연결 가능

- 원하는 멘토가 없으면 멘토 구인 게시글을 작성 가능

  - 게시물은 수정 및 삭제가 가능하다.

</div>
</details>
<details>
<summary>4. 멘토와의 채팅</summary>
<div markdown="1">

- 멘토 상세 프로필 페이지에서 **멘토 연결하기** 선택

- 채팅방이 생성되고 채팅방 리스트 화면으로 이동

- 채팅방에 입장하여 멘토와 채팅으로 소통

</div>
</details>
<details>
<summary>5. 멘토 평가</summary>
<div markdown="1">

- 멘토와의 채팅방에서 평가하기 선택

- 평점과 후기글 작성

  - 후기는 채팅방당 1번만 작성 가능하다.

</div>
</details>

### :exclamation: 멘토

<details>
<summary>1. 회원가입</summary>
<div markdown="1">

- 회원가입 시 멘토 선택

- 본인의 학교를 선택

- 전공 선택 및 전문 전공 강의 분야 2개 선택

- 멘토 프로필 -> 자기소개 & 거주지 설정 & 멘토링 내용 입력

  - 거주지는 위치를 Google Maps로 설정할 수 있다.

- 학교 이메일로 인증 진행

- 닉네임 설정 & 성적표 인증 & 프로필 이미지 설정

  - 성적표는 Google Cloud Vision API의 OCR을 이용하여 총 학점을 추출한다.

  - 멘토는 반드시 성적표로 성적을 인증해야 하며, 총 학점이 일정 학점(3.8) 이상이 되어야 가입이 진행된다.

- 아이디와 비밀번호 설정

</div>
</details>
<details>
<summary>2. 프로필 수정</summary>
<div markdown="1">

- 임시

</div>
</details>
<details>
<summary>3. 멘티 탐색</summary>
<div markdown="1">

##### 3.1. 멘토 구인 게시글 탐색 & 멘티 구인 게시글 작성

- 게시판 탭으로 이동

- [멘토구함] 태그가 붙은 게시글을 검색하여 멘티와 연결 가능

- 원하는 멘티가 없으면 멘티 구인 게시글을 작성 가능

  - 게시물은 수정 및 삭제가 가능하다.

</div>
</details>
<details>
<summary>4. 멘티와의 채팅</summary>
<div markdown="1">

- 작성한 멘티 구인 게시글에 작성된 멘티의 댓글 확인

- 멘티 프로필을 눌러 채팅방 생성

- 멘티와 채팅 진행

</div>
   </details>

   <br>
   
## 👍 Author
---
| 이름   | Link to                                          |
| ------ | ------------------------------------------------ |
| 편동혁 | [@HyukP](https://github.com/HyukP)               |
| 하종수 | [@jong02112004](https://github.com/jong02112004) |
| 심재철 | [@심재철](https://github.com/wocjf0513)          |
| 심규원 | [@kyuwon](https://github.com/skwony)             |
