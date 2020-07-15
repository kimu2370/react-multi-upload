## ProgressBar를 이용한 다중 파일 업로드 하기

#### 사용할 기술

- ReactJS : 프론트엔드 앱 라이브러리
- Redux : 전역 상태 관리 라이브러리
- Redux-thunk : 리덕스에서 비동기 로직을 처리하기 위한 라이브러리
- Axios : 클라이언트 & 서버를 위한 프로미스 기반의 http 요청 라이브러리
- Lodash : 자바스크립트 함수 유틸 라이브러리
- Express : NodeJS 서버 API
- Multer : multipart/form-data 핸들링을 위한 Node.js 미들웨어

---

### 프로젝트 폴더 만들기

```
$ mkdir file-upload-example
$ cd file-upload-example
$ mkdir server
```

### 서버 세팅하기

```
$ cd server
$ touch server.js
$ npm init -y
$ npm i express multer cors
```

> **Multer**에 대한 자세한 설명은
> https://github.com/expressjs/multer/blob/master/doc/README-ko.md
> 를 참고하자.

### 프론트 단 세팅하기

```
$ npx create-react-app client
$ cd client
$ npm i redux react-redux redux-thunk axios lodash
$ npm start
```

### App.js 세팅

```
client/src/App.js
```

### redux item

-> 파일을 첨부 할 때마다 파일이 특정 데이터 구조로 redux 저장소에 저장된다.
