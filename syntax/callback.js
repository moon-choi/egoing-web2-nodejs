// function a() {
//   console.log('A');
// }

var a = function() {
  console.log('A'); // js에서 함수는 값이다. 위의 함수 정의와 같음.
}

function slowFunc(cb) {
  cb();
}

slowFunc(a); //slowFunc의 콜백함수로 a가 들어감. 