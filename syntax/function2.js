console.log(Math.round(1.2))

//Math.round는 자바스크립트의 내장 함수. 매개변수 1.2를 받음. 

function sum(a, b) {
  return a + b;
  // i) 결과를 순수하게 값으로만 리턴해서, 콘솔 로그 이외의 다양한 액션을 할 수 있게. e.g. 파일에 쓰기, 이메일 보내기.
  // ii) 즉시 함수를 종료시킴.
}

sum(2, 3)

//매개변수 parameter (함수의 공란, 입력값 전)
//인자 argument (각각의 입력값)