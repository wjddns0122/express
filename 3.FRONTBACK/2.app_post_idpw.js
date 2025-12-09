const express = require('express');
const app = express();
const PORT = 3100;

app.use(express.static('./3.FRONTBACK/public'));

app.post('/login', (req, res) => {
    // 나의 db와 비교해서.. 로그인 성공/실패..
    let data = '';

    // http의 body가 한덩어리로 올지 두덩어리로 올지 또는 그 이상일지 모름
    // 그래서, 올때마다 내 콜백함수를 불러주시오..
    req.on('data', (chunk) => {
        data += chunk.toString();
    });

    req.on('end', () => {
        console.log(`온 데이터 모음: ${data}`);
        const params = new URLSearchParams(data);
        console.log(params)
        const obj = Object.fromEntries(params.entries());
        console.log(obj);
        res.send(`<h1>당신의 ID는 ${obj.id} 이고 PW는 ${obj.pw} 입니다.`)
    })
});

app.listen(PORT, () => {
    console.log(`Server is ready at http://127.0.0.1:${PORT}`);
});