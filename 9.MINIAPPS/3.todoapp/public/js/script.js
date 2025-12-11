// 입력 DOM
const postContent = document.getElementById('postContent');
const putNumber = document.getElementById('putNumber');
const putContent = document.getElementById('putContent');
const getId = document.getElementById('getId');
const deleteNumber = document.getElementById('deleteNumber');

// 버튼 DOM
const allCheckBtn = document.getElementById('allCheckBtn');
const postContentBtn = document.getElementById('postContentBtn');
const putContentNumberBtn = document.getElementById('putContentNumberBtn');
const getIdBtn = document.getElementById('getIdBtn');
const deleteNumberBtn = document.getElementById('deleteNumberBtn');

// 결과 DOM
const result = document.getElementById('result');

// URL
const baseUrl = '/api/todo'

// 전체 조회(GET)
allCheckBtn.addEventListener('click', () => {
    fetch(baseUrl)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('네트워크 에러가 발생했습니다.');
            }
            return resp.json();
        })
        .then((data) => {
            result.innerHTML = '';

            for (const item of data) {
                const new_li = document.createElement('li');
                new_li.innerHTML = `${item.id}:  ${item.todo}`;
                result.appendChild(new_li);
            }
        })
        .catch((err) => {
            alert('데이터를 가져오는데 에러가 발생하였습니다.')
        });
});

// 내용 생성(POST)
postContentBtn.addEventListener('click', () => {
    const content = postContent.value;

    if (!content) {
        alert("내용을 입력해주세요!");
        return; 
    }

    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            todo: content 
        })
    })
    .then((resp) => {
        if (!resp.ok) {
            throw new Error('네트워크 에러가 발생하였습니다.');
        }
        return resp.json();
    })
    .then((data) => {
        console.log('생성된 데이터:', data);
        postContent.value = ''; 
        result.innerHTML = `${data.id}번째 todo리스트가 ${data.status}`;
    })
    .catch((err) => {
        console.error(err);
        alert('글 작성 중 에러가 발생했습니다.');
    });
});

// 내용 수정(PUT)
putContentNumberBtn.addEventListener('click', () => {
    const putId = putNumber.value;
    const putTodo = putContent.value;

    if (!putId || !putTodo) {
        return alert("리스트 번호 또는 내용을 입력해야합니다!");
    }

    fetch(`${baseUrl}/${putId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            todo: putTodo 
        }),
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('네트워크 에러가 발생했습니다.');
            } return resp.json();
        })
        .then((data) => { 
            result.innerHTML = `${data.id}번째 아이디가 ${data.todo} 내용으로 수정되었습니다!`;
            
            putNumber.value = '';
            putContent.value = '';
        })
        .catch((err) => {
            console.error(err); 
            alert('문자 처리중 오류가 발생하였습니다.');
        });
});

// 특정 ID 삭제
deleteNumberBtn.addEventListener('click', () => {
    const id = deleteNumber.value;
    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })
        .then((resp) => {
            if(!resp.ok) {
                throw new Error('네트워크 에러가 발생하였습니다');
            }
            return resp.json();
        })
        .then(() => {
            deleteNumber.value = ''
            result.innerHTML =`<p>${id}번 todo리스트가 삭제되었습니다!</p>`
        })
        .catch((err) => {
            alert('문자열 전송중 에러가 발생하였습니다', err)
        })
})


// 특정 ID 조회(GET)
getIdBtn.addEventListener('click', () => {
    const id = getId.value;
    fetch(`${baseUrl}/${id}`)
        .then((resp) => {
            if(!resp) {
                throw new Error('네트워크 에러가 발생하였습니다.');
            }
            return resp.json();
        })
        .then((data) => {
            getId.value = ''
            result.innerHTML = `
            <strong>${data.id}번 todo리스트가 조회가 완료되었습니다!</strong><br>
            ${data.id}:  ${data.todo}
            `;
        })
})