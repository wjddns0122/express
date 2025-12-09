const express = require('express');
// const bodyParser = require('body-parser');   // 얫날에는 express에 이게 없어서 설치해야 했움
const app = express();
const PORT = 3100;

app.use(express.static('./3.FRONTBACK/public'));

// app.use(bodyParser.urlencoded());

// form 데이터로 부터 온걸 x-www-form-unlencoded 라고 부름..
// 이 미들웨어는 ? 사용자로부터 전달받은 위 MIME 타입을 찾아서 req.body 에 담아준다.
app.use(express.urlencoded({extended: false}));     // 확장 문법 안씀. 기본 문법만 쓸거임

app.post('/login', (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    
    res.send(`당신의 ID는 ${id} 그리고 PW는 ${pw} 입니다.`)
});

app.listen(PORT, () => {
    console.log('서버 레디');
});

