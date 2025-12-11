// 시작시 초기값
const itemsPerLoad = 20; // 스크롤시 불러오는 갯수
const maxItemsOnScreen = 200; // 화면안에 몇개를 유지할거냐??

let start = 0;
let end = start + itemsPerLoad;


async function getItemsFromTo(start, end, direction = 'down') {
    const result = document.getElementById('result');

    const response = await fetch(`/api/items?start=${start}&end=${end}`);
    const data = await response.json();

    console.log(data);

    if (direction === 'down') {
        data.forEach(item => {
            // 데이터 화면을 아래로 추가
            // console.log(item);
            const itemElement = document.createElement('div');
            itemElement.classList.add('item'); // 디자인을 넣기 위해 클래스를 붙였음
            itemElement.textContent = item;
            result.appendChild(itemElement)
        });
    } else if (direction === 'up') {
        // 스크롤 위로 추가될 떄는 결과를 상단에 삽입
        data.forEach(item => {
            const itemElement = document.getElementById('div');
            itemElement.classList.add('item');
            itemElement.textContent = item;
            result.insertBefore(itemElement, result.firstChild);
        })
    }

    

    let itemsToRemove = result.children.length - maxItemsOnScreen;
    if (itemsToRemove > 0) {
        console.log('지워야 할 아이템수: ', itemsToRemove);
            
        while (itemsToRemove-- > 0) {
            result.removeChild(result.firstElementChild); // 내가 가지고 있는 앞에 요소를 지우기...
        }
    }
};


document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM ready');
    // 4. async/await로 변경하기
    getItemsFromTo(start, end);
});

window.addEventListener('scroll', () => {
    // console.log('스크롤 발생??', window.innerHeight, window.scrollY);
    // 하단 스크롤 처리
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('화면 끝 이동');

        start = end;
        end = end + itemsPerLoad;
        getItemsFromTo(start, end)
    }

    // 상단 스크롤 처리
    if (window.scrollY == 0) {
        start = Math.max(0, start - itemsPerLoad);  // start가 0보다 작은 음수가 될 수 없으므로 0으로 제한
        end = start + itemsPerLoad;
        getItemsFromTo('up');
    }
});