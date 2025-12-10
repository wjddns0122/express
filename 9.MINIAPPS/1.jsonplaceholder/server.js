const express = require('express');
const path = require('path');

const app = express();
const port = 3100;

let posts = [
    { id: 1, title: '나의 첫번쨰 글', body: '이것은 나의 첫번쨰 글입니다.' },
    { id: 2, title: '나의 두번쨰 글', body: '이것은 나의 두번쨰 글입니다.' },
    { id: 3, title: '나의 세번쨰 글', body: '이것은 나의 세번쨰 글입니다.' },
];

// 정적 포인트 가져오기
app.use(express.static(path.join(__dirname, 'public')));

// 미들웨이
app.use(express.json());

// 게시글 생성 (POST 요청 처리)
app.post('/api/posts', (req, res) => {
    // 요청 본문에서 title과 body를 받아옴
    let { title, body } = req.body;

    // title이나 body가 없으면 기본값을 설정
    title = title || '';  
    body = body || '';  

    const newPost = {
        id: posts.length + 1,  // 새로운 id를 자동으로 추가
        title,
        body
    };

    posts.push(newPost);
    res.status(201).json(newPost); // 201 Created 응답 반환
});

// 모든 게시글 조회 API
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 특정 게시글 조회 API
app.get('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id); // URL 파라미터에서 id 값을 가져옴
    const post = posts.find(p => p.id === postId); // id로 게시글 찾기
    
    if (!post) {
        return res.status(404).json({ status: '원하는 항목은 없습니다.' }); // 게시글이 없으면 404 반환
    }

    res.json(post); // 게시글이 있으면 반환
});

// 게시글 수정 API (PUT)
app.put('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id); // URL 파라미터에서 id 값을 가져옴
    const { title, body } = req.body; // 요청 본문에서 title과 body를 받아옴

    const post = posts.find(p => p.id === postId); // id로 게시글 찾기

    if (!post) {
        return res.status(404).json({ status: '원하는 항목은 없습니다.' }); // 게시글이 없으면 404 반환
    }

    // 게시글 수정
    post.title = title || post.title; // title이 있다면 수정, 없으면 기존 title 사용
    post.body = body || post.body; // body가 있다면 수정, 없으면 기존 body 사용

    res.json(post); // 수정된 게시글 반환
});


// 게시글 삭제 API
app.delete('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id); // URL 파라미터에서 id 값을 가져옴
    const newPosts = posts.filter(post => post.id !== postId); // 삭제할 게시글 제외한 배열 생성
    posts = newPosts; // 기존 배열을 새로운 배열로 업데이트
    res.status(204).send(); // 삭제가 성공하면 204 No Content 반환
});

// 서버 실행
app.listen(port, () => {
    console.log('서버레디');
});
