// 미들웨어 같은 것이 등록하는 함수 .. register CRM Generator
// generate_object.forEach((object) =>  {object.generate()})

const myapp = {
    middlewares: [],

    // 미들웨어를 등록하는 메서드(함수)
    register(fn) {
        this.middlewares.push(fn);
    },

    // 미들웨어를 실행하기 위한 메서드
    run(context) {
        for (let fn of this.middlewares) {  // 나에게 등록된 미들웨어를 순차적으로 실행, class가 아니라 constructor 필요 없고 변수 안에 내용을 저장
            fn(context);                    // ex) const app = express();   const app = new express();
        }                                   // 디자인패텀 중 싱글톤 패턴
    }
};

function middlewares1(context) {
    console.log('미들웨어1 실행');
    context.step1 = "미들웨어1 이 처리한 변수";
}

function middlewares2(context) {
    console.log('미들웨어2 실행');
    context.step2 = "미들웨어2 이 처리한 변수";
}

function middlewares3(context) {
    console.log('미들웨어3 실행');
    context.step3 = "미들웨어3 이 처리한 변수";
}

myapp.register(middlewares3);           // 무조건 함수가 불린 순서대로 미들웨어가 실행된다. 미들웨어같은것들이.. 어떻게 자로구조가 등록이 되고 순차적으로 실행이되는가
myapp.register(middlewares2);           ///  배열안에 순서대로 등록이 되고 호출하는애가 순차적으로 실행이 된다.
myapp.register(middlewares1);

const context = {}; // 나의 서비스가 처리되면서 저장할 빈 공간.

myapp.run(context);

console.log('최종 Context 상태: ', context)