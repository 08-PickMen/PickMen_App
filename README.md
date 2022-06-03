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

   <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861169-843700ed-f015-4a36-a627-bf5e32cd931d.PNG"/>
  
- 회원가입 시 멘티 선택

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171861214-6d9fef91-9cd7-42ff-b716-b8cbb3e81b90.PNG"/>

- 본인의 학교를 선택

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171861213-8eeb51ef-0265-4735-bf72-fc26e49ae556.PNG"/>

- 전공 선택 및 관심 강의 분야 2개 선택

<img width = "30%" src = "https://user-images.githubusercontent.com/71802256/171861194-00c3bdf2-6b49-4315-aed6-e8735d173ca8.gif">

- 학교 이메일로 인증 진행

<img width = "30%" src = "https://user-images.githubusercontent.com/71802256/171863493-87cd328d-da75-4524-b220-3bc4a8c063a2.gif">

- 닉네임 설정 & 프로필 이미지 설정 & 위치 설정

  - 멘티는 성적표를 인증하지 않는다.

  - 멘티의 위치를 Google Maps로 설정할 수 있다.

<img width = "30%" src = "https://user-images.githubusercontent.com/71802256/171861206-af2f4cbc-4d0c-4bab-8300-689ea6a7eb31.PNG">

- 아이디와 비밀번호 설정

</div>
</details>
<details>
<summary>2. 프로필 수정</summary>
<div markdown="1">

<img width = "30%" src = "https://user-images.githubusercontent.com/71802256/171863249-1bdf316a-51e3-4bea-b09b-e601bca3efe0.gif">

- 프로필 수정

  - 로그인 후 내 프로필 탭을 누르면  내 프로필 정보가 나온다.

  - 하단의 Personal Information Setting을 누르면 프로필 수정 창으로 이동한다.
  
  - 프로필은 닉네임, 프로필 이미지, 관심 강의를 수정할 수 있다.

</div>
</details>
<details>
<summary>3. 멘토 탐색</summary>
<div markdown="1">

##### 3.1. 멘토 프로필 탐색

- 멘토 프로필 리스트 확인

  - 기본적으로 멘토들은 로그인한 사용자의 **관심 강의 분야** -> **전공** -> **멘토 평점** 순으로 추천되어 보여진다.

- 정렬 필터링을 통해 원하는 순으로 멘토들을 정렬할 수 있다.

  <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861202-ef252804-def0-41c7-becf-78570e2f09fe.gif"/>

  - 전공 별 정렬

  <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861199-82ebd7a9-6f54-4147-b35a-c0c63a446cf7.gif"/>

  - 강의 별 정렬

  <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861203-ea0f818d-c587-422c-835a-2b57ecdd8e2c.gif"/>
  
  - 평점 별 정렬



- 멘토 프로필 정보

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171861172-993302d6-767d-4d19-bbf7-10ca311d9c19.PNG"/>

  - 멘토의 프로필 이미지 & 닉네임 & 전공 & 전공 강의 분야 리스트 를 보여준다.

  - 멘토 상세 프로필 정보

  <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861185-36818413-0b12-4261-b059-8cb33765522e.gif"/>

    - 멘토의 프로필을 선택하면 프로필 상세 페이지로 이동한다.

    - 멘토의 소개와 후기를 볼 수 있다.

##### 3.2. 멘티 구인 게시글 탐색 & 멘토 구인 게시글 작성

- 게시판 탭으로 이동

  <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861183-105ec55b-e53d-4d7c-91c5-7b212ec11edc.gif"/>

  - [멘티구함] 태그가 붙은 게시글을 검색하여 멘토와 연결 가능

  <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861182-acbfb9d1-2b11-42dc-8796-7dcf14072114.gif"/>

  - 원하는 멘토가 없으면 멘토 구인 게시글을 작성 가능

  - 게시물은 수정 및 삭제가 가능하다.

    <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861179-fdcf30ea-d852-4101-90f9-f0811378fb9b.gif"/>

    - 게시글 수정

    <img width="30%" src="https://user-images.githubusercontent.com/71802256/171861175-57167a92-bd3a-42ba-b849-afa341faeccd.gif"/>

    - 게시글 삭제



</div>
</details>
<details>
<summary>4. 멘토와의 채팅</summary>
<div markdown="1">

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171861190-4d2a5b2e-326d-43c0-9b42-4d25f72d5cee.gif"/>

- 멘토 상세 프로필 페이지에서 **멘토 연결하기** 선택

- 채팅방이 생성되고 채팅방 리스트 화면으로 이동

- 채팅방에 입장하여 멘토와 채팅으로 소통

</div>
</details>
<details>
<summary>5. 멘토 평가</summary>
<div markdown="1">

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865696-23c6fd65-2d8d-42dc-994f-2774d15adf66.gif"/>

- 멘토와의 채팅방에서 평가하기 선택

- 평점과 후기글 작성

  - 후기는 채팅방당 1번만 작성 가능하다.

</div>
</details>

### :exclamation: 멘토

<details>
<summary>1. 회원가입</summary>
<div markdown="1">

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865915-3f6cf18d-96b0-4883-b3a4-1be0595a4fcc.PNG"/>

- 회원가입 시 멘토 선택

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865959-0f7ded86-086a-4ae2-9f5e-28c55d3a2bc5.PNG"/>

- 본인의 학교를 선택

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865954-a82d7622-500e-4a2e-a152-c2bb3e68d890.PNG"/>

- 전공 선택 및 전문 전공 강의 분야 2개 선택

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865920-6fec5c87-4459-4b93-b13d-8d69ce42fad2.gif"/>

- 멘토 프로필 -> 자기소개 & 거주지 설정 & 멘토링 내용 입력

  - 거주지는 위치를 Google Maps로 설정할 수 있다.

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865944-eacde79e-3162-4911-81cc-f366aa82874a.gif"/>

- 학교 이메일로 인증 진행

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865945-2d7eb0da-4747-40fd-bb69-ae99f26dbe3f.gif"/>

- 닉네임 설정 & 성적표 인증 & 프로필 이미지 설정

  - 성적표는 Google Cloud Vision API의 OCR을 이용하여 총 학점을 추출한다.

  - 멘토는 반드시 성적표로 성적을 인증해야 하며, 총 학점이 일정 학점(3.8) 이상이 되어야 가입이 진행된다.

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865949-4c7a9eeb-38b1-485b-a5f7-2bc9e13a30b0.PNG"/>

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

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171868096-ebd65d56-b77c-4ed7-98e2-b420fa30f9a1.gif"/>

- [멘토구함] 태그가 붙은 게시글을 검색하여 멘티와 연결 가능

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865941-5492831a-c9b3-4bb5-9f9f-2243de227864.gif"/>

- 원하는 멘티가 없으면 멘티 구인 게시글을 작성 가능

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865939-ad14455b-5269-418f-8a3e-4c4661891b16.gif"/>

- 게시글 수정

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171865937-20a03737-2877-4ac2-97a2-12675f88db6e.gif"/>

- 게시글 삭제

  - 게시물은 수정 및 삭제가 가능하다.

</div>
</details>
<details>
<summary>4. 멘티와의 채팅</summary>
<div markdown="1">

<img width="30%" src="https://user-images.githubusercontent.com/71802256/171867545-e66f9cf6-a685-43ca-bed0-33fd43de88b2.gif">

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
