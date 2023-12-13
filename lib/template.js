//main.js안에 있기 너무 길어서 다른 파일로 옮겼을 뿐임.

module.exports = { //이 object는 두개의 funcion을 가짐.
  html: function (title, list, control, body) { //html을 그려주는 func.
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">Node.js App</a></h1>
      ${list}
      ${control}
      ${body}
      </body>
    </html>
    `;
  },
  list: function (files) { //directory 안의 file list를 반복해서 그려주는 func.
    var list = '<ul>';
    var i = 0;
    while (i < files.length) {
      list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`
      i = i + 1;
    }
    return list = list + '</ul>'
  }
}

// module.exports = templateObj; 대신에 아예 위에 변수 이름 ( var templateObj = {...} )을 지워주고 modue.exports 써도 됌. 