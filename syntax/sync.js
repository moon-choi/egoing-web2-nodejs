var fs = require('fs'); //fs는 object임.

//readFileSync (동기) => Returns the contents of the path.

// console.log('a');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8'); //readFileSync 는 리턴값을 줘서 변수에 저장 가능. // 만약 readFileSync가 매우 오래 걸릴 경우 여기서 코드 실행 됄 때까지 다음 줄은 진행안 됌. 
// console.log(result);
// console.log('c')

//readFile (비동기) => The callback is passed two arguments(err, data), where data is the contents of the file.

console.log('a');
fs.readFile('syntax/sample.txt', 'utf8', function (err, result) {
  console.log(result);
}); //readFile 은 리턴값이 아니어서 변수에 저장 불가능. 대신 콜백함수를 세번째 인자로 줌. 그럼 nodejs가 세번째 함수를 실행시킴.
console.log('c')
//https://www.educative.io/answers/what-is-the-fsreadfile-in-nodejs?irclickid=QtRV8xRrzxyPU8FTwgSsTVXeUkFS8HXQxXe00Q0&aff=BXjX&impactaffid=123201&irgwc=1