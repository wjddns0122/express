const express = require('express');
const figlet = require('figlet');
const path = require('path');
const morgan = require('morgan');


// 가상 데이터 생성 - id 속성을 가진 객체 배열로 변경
const data = Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    name: `Item ${i + 1}`
}));
// console.log(data);

const app = express();
const PORT = 3100;

// 미들 웨어 추가
app.use(express.static(path.join(__dirname, 'public')));


function getItemsFromTo(start, end) {
    return data.slice(start, end);
}

app.use(myLogger)
function myLogger() {
    return function (req, res, next) {
        const now = new Date().toISOString();
        const method = req.method;
        if (option == 'dev') {
            console.log(`DEV [${now}] [${method}] [${urlpath}]`);
        } else {
            console.log(`RELEASE [${now}] [${method}] [${urlpath}]`);
        }
        next();
    }
}
// app.use(morgan('dev')); // 'dev', 'combined', 'common'

// 0부터 20사이의 랜덤 숫자 생성
function getRandomIncrease() {
    return Math.floor(Math.random() * 21); // 0 ~ 21
}

// 매 10초마다 위의 생성된 갯수를 랜덤하게 증가
// setInterval(() => {
    //     const randNum = getRandomIncrease();
    //     const currentLength = data.length;
    //     for (let i = 0; i < randNum; i++) {
        //         data.push(`Item ${currentLength + i + 1}`);
        //     }
        //     console.log(`Added ${randNum}`)
        // }, 10_000);
        
        // /api/:id 형태로 요청 받기
        app.get('/api/items', (req, res) => {
    // 1. 변수를 선언하고 사용자의 입력을 받아온다.
    // 모든 입력은 다 문자열이다. 내부 연산을 위해 필요한 타입들로 변환을 해주는것이 좋음..
    // const start = req.query.start;
    // const end = req.query.end;

    const { start, end } = req.query;

    // 2. 이 번호에 해당하는걸 우리 배열에서 골라낸다
    const items = getItemsFromTo(parseInt(start), parseInt(end)); // id로 아이템 찾기

    // 3. 찾은 내용을 전달한다 (없으면 404 에러)
    if (items) {
        res.json(items);
    } else {
        res.status(404).json({ error: '아이템을 찾을 수 없습니다' });
    }
})

app.listen(PORT, () => {
    figlet("SESAC", (err, data) => { if (!err) console.log(data); });
    console.log(`Server is up on http://localhost:${PORT}`)
})