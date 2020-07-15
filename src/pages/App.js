import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setUploadFile } from '../redux/uploadFile/uploadFile.actions';
import UploadProgress from '../components/UploadProgress/UploadProgress';
import logo from '../logo.svg';
import '../App.css';

function App(props) {
  //첨부 파일 핸들링
  const { setUploadFile } = props;

  // 새로고침 핸들링
  // useEffect(() => {
  //   window.addEventListener('beforeunload', (e) => {
  //     e.returnValue = '';
  //   });
  //   return () => {
  //     window.removeEventListener('beforeunload', (e) => {
  //       e.returnValue = '';
  //     });
  //   };
  // }, []);

  const handleClick = () => {
    props.history.push('/list');
  };

  const handleAttachFile = (e) => {
    // could do some validation for the attached file here
    // e.preventDefault();
    setUploadFile(e.target.files);
    e.target.value = ''; // to clear the current file
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>목록보기</button>
        <img src={logo} className="App-logo" alt="logo" />
        <input type="file" multiple onChange={handleAttachFile} />
      </header>
      <UploadProgress />
    </div>
  );
}

// 연결된 컴포넌트에 props로 상태 부여
const mapStateToProps = (state) => {
  return state;
};

// 연결된 컴포넌트에 props로 action 부여
const mapDispatchToProps = (dispatch) => ({
  setUploadFile: (files) => dispatch(setUploadFile(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
