const express = require('express');
const app = express();
const PORT = 3100;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
});