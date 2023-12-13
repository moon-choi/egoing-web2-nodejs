// var v1 = 'v1'
// var v2 = 'v2'
// function f1() {
//   console.log(o.v1)
// }

// function f2() {
//   console.log(o.v2)
// }

//객체는 정리정돈해서 그룹핑하여 코드의 복잡성을 낮춘다.
//위의 모든 값을 하나의 객체에 다 담을 수 있다.

var o = { //객체는 값을 담는 그릇이다.
  v1: 'v1',
  v2: 'v2',
  f1: function () { //함수는 값이다.
    console.log(this.v1) //console.log(o.v1)와 같음.
  },
  f2: function () {
    console.log(this.v2) //console.log(o.v2)와 같음.
  }
}

//this의 쓰임새: object가 뭘로 불리든 간에 (변수 이름이 바뀌어도) 항상 그 object를 가리킴.
o.f1();
o.f2();