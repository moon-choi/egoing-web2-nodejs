var testFolder = './data'; // 'data' 와 './data'는 같음. './'는 현재 디렉토리. '../'는 부모 디렉토리.
var fs = require('fs');

fs.readdir(testFolder, function (error, filelist) {
  console.log(filelist);
})