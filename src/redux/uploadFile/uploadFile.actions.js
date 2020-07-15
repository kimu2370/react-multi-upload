import axios from 'axios';
import uploadFileTypes from './uploadFile.types';

export const setUploadFile = (data) => {
  return {
    type: uploadFileTypes.SET_UPLOAD_FILE,
    payload: data,
  };
};

export const setUploadProgress = (id, progress) => ({
  type: uploadFileTypes.SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
});

export const successUploadFile = (id) => ({
  type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
  payload: id,
});

export const failureUploadFile = (id) => ({
  type: uploadFileTypes.FAILURE_UPLOAD_FILE,
  payload: id,
});

/**
 * 서버에 업로드 할 파일 배열을 받는다.
 * 함수 내에서 파일 길이만큼 반복한다.
 * 각 루프는 파일을 FormData에 추가하고, axios post 메서드를 사용하여
 * 로컬 호스트 서버로 보낸다.
 * 업로드를 한번 실행하면 axios에 의해 상태 값만 뷰에 보여주면 되기 때문에
 * async await 제거
 */
export const uploadFile = (files) => (dispatch) => {
  if (files.length) {
    files.forEach((file) => {
      const formPayload = new FormData();
      formPayload.append('file', file.file);

      // 업로드바 상태 값을 초기화 한다. null => 0
      setUploadProgress(file.id, 0);
      axios({
        baseURL: 'http://10.130.221.168:8090',
        // url: '/file',
        method: 'post',
        data: formPayload,
        onUploadProgress: (p) => {
          // axios는 각 업로드 진행 상황을 볼 수 있는 onUploadProgress를 받는다.
          const percentageProgress = Math.round((p.loaded * 100) / p.total);
          dispatch(setUploadProgress(file.id, percentageProgress));
        },
      })
        .then(() => dispatch(successUploadFile(file.id)))
        .catch(() => dispatch(failureUploadFile(file.id)));
    });
  }
};
