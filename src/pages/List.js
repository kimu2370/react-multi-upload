import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
const List = (props) => {
  console.log(props);
  return <div>여기는 List 페이지야</div>;
};

// 연결된 컴포넌트에 props로 상태 부여
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, null)(List);
