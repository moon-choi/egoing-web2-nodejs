var args = process.argv;
console.log('args:', args)
console.log(args[2]); //node 실행 후 사용자가 입력하는 input값
console.log('A')
console.log('B')
if (args[2] === '1') {
  console.log('C1')
} else {
  console.log('C2')
}
console.log('D')


//command line
// node conditional.js 1
// node conditional.js 2
