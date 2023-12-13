var f = function () {
  console.log(1 + 2); //함수는 값이 됄 수 있다. 그렇기에 함수를 배열과 객체에 담을 수 있다.
}

var a = [1, 2, f] //함수는 array의 element 가 됄 수 있다.
console.log('array function:', a[2]) 
a[2](); //함수 실행됌. 

var o = {
  func: f //함수는 object의 property가 됄 수 있다.
}

console.log('object function:', o.func)
o.func(); //함수 실행됌.
 