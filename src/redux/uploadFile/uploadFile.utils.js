import { size } from 'lodash';

/**
 * 들어오는 파일을 Object로 수정하고 마지막으로 각 파일 Object를 INITIAL_STATE에 넣는다.
 */
export const modifyFiles = (existingFiles, files) => {
  let fileToUpload = {};
  // 파일 갯수만큼 반복한다.
  for (let i = 0; i < files.length; i++) {
    const id = size(existingFiles) + i + 1;
    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: files[i],
        progress: null,
      },
    };
  }
  return fileToUpload;
};
