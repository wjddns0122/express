const express = require('express');
const path = require('path');
const app = express();
const PORT = 3100;

app.get('/', (req, res) => {
    // 여기에서 내가 직접 파일을 읽어다가 전달하는걸 구현할수는 없나?
    const htmlFilePath = path.join(__dirname, 'public', 'index.html');

    // res.send(); // 컨텐츠를 보내는 애
    res.sendFile(htmlFilePath, (err) => {   // 성공했으면, 보내고 끝, 실패했으면 콜백함수를 통해서 처리
        if (err) { 
            console.error("파일 전송 오류", err);
            res.status(500).send("서버에서 파일을 처리하는데 오류가 발생했습니다.");
        }
    });
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
});