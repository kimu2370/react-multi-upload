import React from 'react';
import { toArray } from 'lodash';
import { connect } from 'react-redux';

const List = (props) => {
  const handleClick = () => {
    props.history.push('/');
  };

  return (
    <>
      <div>여기는 List 페이지야</div>
      <button onClick={handleClick}>메인으로 가기</button>
      {toArray(props.fileProgress).map((item, i) => (
        <div style={{ marginTop: '20px' }} key={i}>
          {`${item.id}. ${item.file.name} : `}
          <span style={{ color: 'red' }}>{`${item.progress}%`}</span>
        </div>
      ))}
    </>
  );
};

// 연결된 컴포넌트에 props로 상태 부여
const mapStateToProps = (state) => {
  return state.UploadFile;
};
export default connect(mapStateToProps, null)(List);
