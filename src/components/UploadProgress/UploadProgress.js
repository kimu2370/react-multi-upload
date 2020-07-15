import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { size, toArray } from 'lodash';

import { uploadFile } from '../../redux/uploadFile/uploadFile.actions';
import UploadItem from '../UploadItem/UploadItem';
import Styles from './UploadProgress.module.css';

const UploadProgress = (props) => {
  const { fileProgress, uploadFile } = props;
  const uploadedFileAmount = size(fileProgress);

  // 예외처리 필요(큰 파일을 때 file의 progress가 0일 경우 같은 파일 업로드 될 가능성)
  const doUpload = useCallback(() => {
    const fileToUpload = toArray(fileProgress).filter(
      (file) => file.progress === null
    );
    uploadFile(fileToUpload);
  }, [fileProgress, uploadFile]);

  useEffect(doUpload, [uploadedFileAmount]);

  return uploadedFileAmount > 0 ? (
    <div className={Styles.wrapper}>
      <h4>Uploading File</h4>
      {size(fileProgress)
        ? toArray(fileProgress).map((file) => (
            <UploadItem key={file.id} file={file} />
          ))
        : null}
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    fileProgress: state.UploadFile.fileProgress,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (files) => dispatch(uploadFile(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgress);
