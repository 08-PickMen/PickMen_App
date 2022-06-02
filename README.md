<img width="70%" src="img/로고.png"/>

# PickMen

## 개요

PickMen은 모바일 앱으로 대학교에서 멘토링을 할 수 있도록 멘토를 매칭시켜주는 멘토링 매칭 플랫폼이다.

대학생들은 전공 지식 및 학교 생활에 대한 정보를 얻고 싶은데, 신입생과 저학년들은 검색이 미숙하고 정보를 얻을 주체가 동아리나 소학회에만 한정되어 있다.
이에 대한 방안으로 멘토링 프로그램이 존재하지만, 실제 참여율은 저조하고 멘토링을 의무적으로 참여해야하는 등 부담을 가질 수 있다.

PickMen은 이러한 멘토링을 모바일 앱으로 보다 쉽고, 자율적으로 제공하면 어떨까라는 고민에서 시작되었다. 멘티는 멘토들의 프로필 리스트로부터 멘토와 매칭할 수 있고, 멘토와의 채팅을 통해 대학생들이 원하는 전공 지식 및 학교 생활 등에 대한 정보를 얻을 수 있게 하였다. 그리고 찾는 멘토가 없다면 원하는 정보를 얻기 위해 구인 게시판에서 멘토를 구할 수 있다.

## 기대효과

PickMen은 멘토링 서비스를 앱으로 제공하여 멘토링에 접근하는 것에 대한 부담감을 줄이고자 한다. 그리고 멘토링 서비스를 통해 대학생들의 전반적인 학습 수준 향상을 기대할 수 있다. 또한 대학생들이 원하는 전공 지식이나 학교 생활에 관한 정보를 얻을 수 있는 새로운 플랫폼 형성을 기대한다.

## 시스템 구조

<img src="https://user-images.githubusercontent.com/68629997/171593248-e28bb6d2-0118-4e0b-846d-0ab0c6dcc8d6.PNG" width="90%">

- React-Native

  - Front-end client 구현
    <br>

- Spring-Boot

  - Back-end server 구현
    <br>

- SockJS

  - 실시간 통신, 채팅을 위해 사용
    <br>

- Google Cloud Vision OCR API

  - 이미지에서 텍스트 추출
  - 성적표 인증을 위해 사용
    <br>

- Firebase
  - 채팅 알림을 위해 사용

## 개발 도구 및 버전

- ![react-native-cli](https://img.shields.io/static/v1?label=react-native-cli&message=v2.0.1&color=blueviolet)

- ![react-native](https://img.shields.io/static/v1?label=react-native&message=v0.67.4&color=orange)

- ![npm](https://img.shields.io/static/v1?label=npm&message=v7.6.0&color=skyblue)

- ![spring-boot](https://img.shields.io/static/v1?label=spring-boot&message=v2.6.7&color=bluegreen)

- ![mysql](https://img.shields.io/static/v1?label=mysql&message=v8.0.29&color=blue)

## 외부 API

- [Firebase](https://firebase.google.com/)

- [Google Maps](https://developers.google.com/maps/)

- [Google Cloud Vision API](https://cloud.google.com/vision/docs/ocr?hl=ko)

## 실행 방법

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

## 구현 기능

### 메인기능

#### 1. 회원가입

##### 1.1. 멘토

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

##### 1.2. 멘티

- 회원가입 시 멘티 선택

- 본인의 학교를 선택

- 전공 선택 및 관심 강의 분야 2개 선택

- 학교 이메일로 인증 진행

- 닉네임 설정 & 프로필 이미지 설정 & 위치 설정

  - 멘티는 성적표를 인증하지 않는다.

  - 멘티의 위치를 Google Maps로 설정할 수 있다.

- 아이디와 비밀번호 설정

#### 2. 멘토 프로필 리스트를 통해 매칭

- 멘토 프로필 탭으로 이동

- 멘토 프로필 리스트 확인

  - 기본적으로 멘토들은 로그인한 사용자의 **관심 강의 분야** -> **전공** -> **멘토 평점** 순으로 추천되어 보여진다.

  - 정렬 필터링을 통해 원하는 순으로 멘토들을 정렬할 수 있다.

- 멘토 프로필 정보

  - 멘토의 프로필 이미지 & 닉네임 & 전공 & 전공 강의 분야 리스트 를 보여준다.

- 멘토 상세 프로필 정보

  - 멘토의 프로필을 선택하면 상세 페이지로 이동한다.

  -

## Author

---

| 이름   | Link to                                          |
| ------ | ------------------------------------------------ |
| 편동혁 | [@HyukP](https://github.com/HyukP)               |
| 하종수 | [@jong02112004](https://github.com/jong02112004) |
| 심재철 | [@심재철](https://github.com/wocjf0513)          |
| 심규원 | [@kyuwon](https://github.com/skwony)             |
