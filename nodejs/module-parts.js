// var M = {
//   v: 'v',
//   f: function () {
//     console.log(this.v);
//   }
// }
// module.exports = M; //M 객체 모듈 전체를 외부로 보낼 때.

//아니면 이렇게 써도 됌.
module.exports = {
  v: 'v',
  f: function () {
    console.log(this.v);
  }
}
