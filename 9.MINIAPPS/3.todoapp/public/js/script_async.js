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
const baseUrl = '/api/todo';

// 1. 전체 조회 (GET) - async/await 적용
allCheckBtn.addEventListener('click', async () => {
    try {
        const resp = await fetch(baseUrl);

        if (!resp.ok) {
            throw new Error('네트워크 에러가 발생했습니다.');
        }

        const data = await resp.json();

        result.innerHTML = '';
        for (const item of data) {
            const new_li = document.createElement('li');
            new_li.innerHTML = `${item.id}:  ${item.todo}`;
            result.appendChild(new_li);
        }

    } catch (err) {
        alert('데이터를 가져오는데 에러가 발생하였습니다.');
    }
});

// 2. 내용 생성 (POST) - async/await 적용
postContentBtn.addEventListener('click', async () => {
    const content = postContent.value;

    if (!content) {
        alert("내용을 입력해주세요!");
        return;
    }

    try {
        const resp = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                todo: content
            })
        });

        if (!resp.ok) {
            throw new Error('네트워크 에러가 발생하였습니다.');
        }

        const data = await resp.json();

        console.log('생성된 데이터:', data);
        postContent.value = '';
        result.innerHTML = `${data.id}번째 todo리스트가 ${data.status}`;

    } catch (err) {
        console.error(err);
        alert('글 작성 중 에러가 발생했습니다.');
    }
});

// 3. 내용 수정 (PUT) - async/await 적용
putContentNumberBtn.addEventListener('click', async () => {
    const putId = putNumber.value;
    const putTodo = putContent.value;

    if (!putId || !putTodo) {
        return alert("리스트 번호 또는 내용을 입력해야합니다!");
    }

    try {
        const resp = await fetch(`${baseUrl}/${putId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo: putTodo
            }),
        });

        if (!resp.ok) {
            throw new Error('네트워크 에러가 발생했습니다.');
        }

        const data = await resp.json();

        result.innerHTML = `${data.id}번째 아이디가 ${data.todo} 내용으로 수정되었습니다!`;
        putNumber.value = '';
        putContent.value = '';

    } catch (err) {
        console.error(err);
        alert('문자 처리중 오류가 발생하였습니다.');
    }
});

// 4. 특정 ID 삭제 (DELETE) - async/await 적용
deleteNumberBtn.addEventListener('click', async () => {
    const id = deleteNumber.value;

    if (!id) {
        return alert("삭제할 ID를 입력해주세요!");
    }

    try {
        const resp = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });

        if (!resp.ok) {
            throw new Error('네트워크 에러가 발생하였습니다');
        }

        // DELETE 응답에 body가 없는 경우도 있지만, 기존 코드 흐름대로 json 파싱을 시도합니다.
        // 만약 서버에서 빈 본문을 준다면 여기서 에러가 날 수 있으니 서버 응답에 주의하세요.
        const data = await resp.json();

        deleteNumber.value = '';
        result.innerHTML = `<p>${id}번 todo리스트가 삭제되었습니다!</p>`;

    } catch (err) {
        alert('문자열 전송중 에러가 발생하였습니다');
        console.error(err);
    }
});

// 5. 특정 ID 조회 (GET) - async/await 적용
getIdBtn.addEventListener('click', async () => {
    const id = getId.value;

    if (!id) {
        return alert("ID를 입력해주세요!");
    }

    try {
        const resp = await fetch(`${baseUrl}/${id}`);

        if (!resp.ok) {
            throw new Error('네트워크 에러가 발생하였습니다.');
        }

        const data = await resp.json();

        getId.value = '';
        result.innerHTML = `
            <strong>${data.id}번 todo리스트가 조회가 완료되었습니다!</strong><br>
            ${data.id}:  ${data.todo}
        `;

    } catch (err) {
        console.error(err);
        alert('조회 중 에러가 발생했습니다.');
    }
});