import produce from 'immer';
import uploadFileTypes from './uploadFile.types';
import { modifyFiles } from './uploadFile.utils';

/**
 * 배열 형식이 아닌 객체 형식으로 저장하는 이유는
 * 업로드 진행률이 증가 할 때마다 redux 저장소에서 각 파일의 진행률 필드를 업데이트 해야 하기 때문이다.
 * 만약 배열이라면 먼저 인덱스를 찾기 위해 배열을 반복한 다음 원하는 항목을 업데이트 해야한다.
 * 또한 각 파일의 진행 상황을 업데이트 할 때마다 항상 반복을 수행해야 한다.
 * 그러나 객체라면 반복할 필요 없이 그 키만 정확히 제공하면 진행 상황을 업데이트 할 수 있다.
 */

const INITIAL_STATE = {
  fileList: [],
  fileProgress: {
    // 1: {
    //   id: 1,
    //   file,
    //   progress: 0,
    // },
  },
};

const fileProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uploadFileTypes.SET_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          ...modifyFiles(state.fileProgress, action.payload),
        },
      };

    case uploadFileTypes.SET_UPLOAD_PROGRESS:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };

    case uploadFileTypes.ADD_FILE:
      return produce(state, (draft) => {
        draft.fileList.push(state.fileProgress[action.payload.id]);
        draft.fileProgress = {
          ...state.fileProgress,
          ...modifyFiles(state.fileProgress, action.payload),
        };
      });

    case uploadFileTypes.SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 1,
            progress: 100,
          },
        },
      };

    case uploadFileTypes.FAILURE_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };

    default:
      return state;
  }
};

export default fileProgressReducer;
