const express = require('express');
const path = require('path');
const app = express();
const port = 3100;

let posts = [
    { id: 1, title: '나의 첫번쨰 글', body: '이것은 나의 첫번쨰 글입니다.'},
    { id: 2, title: '나의 두번쨰 글', body: '이것은 나의 두번쨰 글입니다.'},
    { id: 3, title: '나의 세번쨰 글', body: '이것은 나의 세번쨰 글입니다.'},
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const post = posts.find(p => p.id == postId);
    
    if (!post) {
        return res.status(404).json({ status: '원하는 항목은 없습니다.' });
    }
    res.json(post);
});

app.delete('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const newPosts = posts.filter(post => post.id !== postId);
    posts = newPosts;
})


app.listen(port, () => {
    console.log('서버레디');
});
