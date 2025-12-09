const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

const PORT = 3100;

app.set('view engine', 'njk')   // Html 로 하면 이거 지우고

nunjucks.configure('views', {
    autoescap: true,    // XSS 자동 대응하기 위한 설정
    express: app,
    watch: true     // 개발용으로, 템플릿 파일의 변경을 알아서 감지해줌
});

app.get('/', (req, res) => {
    res.render('index', { title: '익스프레스 앱', message: '서버사이드 렌더링을 합니다.' });        // 여기서 Index.html로 바꿔준다
});

app.get('/fruits', (req, res) => {
    const fruits = ['사과', '바나나', '오렌지', '포도'];
    res.render('fruits', { fruits: fruits })
})

app.listen(PORT, () => {
    console.log('서버 레디');
});