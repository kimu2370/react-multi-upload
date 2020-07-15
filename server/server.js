const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 5000;

// any request coming in, transfer all body into JSON
app.use(express.json());

// allow cross origin from client localhost
app.use(cors());

// creating POST endpoint /file
app.post('/file', upload.single('file'), (request, response) => {
  console.log('body', request.file.length, request.file);

  // request.file 은 요청한 'file'에 대한 정보이다.
  // 텍스트 필드가 있는 경우, request.body
  // here you can do anything that you want for th file
  // ex: you want to save it to database here

  response.json({ success: true });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
