// var M = {
//   v: 'v',
//   f: function () {
//     console.log(this.v);
//   }
// }
// M.f();

var parts = require('./module-parts.js') //모듈을 가져올 때. parts는 object.
console.log('parts:', parts)
parts.f(); // M.f()와 동일함.

