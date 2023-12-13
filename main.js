var http = require('http');
var fs = require('fs');
var url = require('url'); //모듈
var qs = require('querystring');
var templateObj = require('./lib/template.js')
var path = require('path'); //모듈 로드
var sanitizeHtml = require('sanitize-html');

var server = http.createServer(function (request, response) { //.createSerever 는 node.js 의 API (method) //API란 어플리케이션을 프로그래밍 하기위한 "조작장치."
  // web client가 request 보낼 때마다 createServer API (method)는 response를 보냄.

  // request는 거대한 object임. 그중에 url이라는 property가 있음.
  var _url = request.url; // => /?id=javascript

  var queryData = url.parse(_url, true).query; // => { id: 'javascript' }
  // url: 위에서 모듈로 정의됌. object임. 그중에 parse라는 property 있음(function).
  // url.parse: object임. 그중에 query라는 property가 있음(object).
  var pathname = url.parse(_url, true).pathname // '/'
  if (pathname === '/') { //read 모드 (create, update, delete가 아닐 때).
    if (queryData.id === undefined) { //homepage일 때. 빈 객체 {}.
      // 파일 목록을 가져오는 코드로 감싸준다.
      fs.readdir('data', function (error, files) { // './data'도 같은 표현.
        var title = 'Welcome to homepage'
        var description = 'Hello Node.js'
        var list = templateObj.list(files) //directory안의 모든 파일 보여줌.
        var template = templateObj.html(title, list, //위의 내용 토대로 템플릿 그려냄.
          `<a href="/create">Create</a>`,
          `<h2>${title}</h2>${description}`,)
        response.writeHead(200);
        response.end(template, console.log('this is home'));
      })
    } else { //data 폴더안의 file page
      fs.readdir('./data', function (error, files) { //외부에서 읽어들이는 부분은 다 sanitize할 것.
        var filteredId = path.parse(queryData.id).base //dir 포함한 전체 경로를 주면 파일 안의 description을 읽어버리기 때문에 base만 줌. // 'localhost:3000/?id=/..password.js' 로 접속해서 확인 가능.
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) { //경로를 세탁하기 'data/../password.js를 숨겨야함.
          var title = queryData.id
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);
          var list = templateObj.list(files)
          var template = templateObj.html(sanitizedTitle, list,
            `<a href="/create">Create</a> 
            <a href="/update?id=${sanitizedTitle}">Update</a> 
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>
          `,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`)
          response.writeHead(200);
          response.end(template, console.log('this is data page'));
          //delete 버튼은 post 방식이므로 form 형식으로 만들어줌.
          //description 은 불필요해서 생략하므로 '/delete_process'의 body 객체에는 id만 담길 예정.ㄹ
        });
      });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', function (error, files) {
      var title = 'Welcome to create page'
      var description = 'Make a new one'
      var list = templateObj.list(files)
      var template = templateObj.html(title, list,
        '', //create 일땐 update도 없어도 돼니까 빈 변수로 넣어줌. 안 그러면 undefined됌.
        `       
        <h2>${title}</h2>
        <p>${description}</p>
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="Insert a title."></p>
          <p>
            <textarea name="description" id="" cols="30" rows="10" placeholder="Insert a description."></textarea>
          </p>
          <p>
            <input type="submit" value="Post">
          </p>
        </form>
        `)
      response.writeHead(200);
      response.end(template, console.log('this is create page')); //response.end()는 /create 페이지로 접속할 때 실행됌.(/create request에 대한 response)
    })
  } else if (pathname === '/create_process') { //form의 create을 누르는 순간, 위의 name 값을 쿼리스트링으로 data 속에 담아 보냄. 
    var body = ''; //1. 웹브라우저가 post 방식으로 데이터 처리할 때 데이터가 많은 경우를 대비해서
    request.on('data', function (data) { //2. 서버쪽에서 수신할 때마다 이 콜백함수를 호출. 호출할 때 data라는 인자를 통해 수신한 정보를 주어야함. 
      body = body + data; //바디에 조금씩 조각 조각 추가해줌.
      // body = title=xx&description=yy
    });
    request.on('end', function () { //3. 더이상 들어올 정보가 없으면 다음 콜백을 호출해줌.
      var post = qs.parse(body); // post = { title: 'xx', description: 'yy' }
      var title = post.title; //xx
      var description = post.description; //yy
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` }); //response code 302: redirection
        response.end(); //response.end() is always needed to let the server know we're done building the response send, anything left and close browser connection. 
      })
    });
    //.on은 request 객체의 _events 객체에 bind 해줌. ('data', 'end'는 request > _events 밑에 bind됌.)
    // console.log('create request._events::', request._events)
    //body, data 참고: https://gakari.tistory.com/entry/Nodejs-POST-%EC%9A%94%EC%B2%AD-Nodejs%EC%97%90%EC%84%9C-%EC%B2%98%EB%A6%AC-%EB%B0%A9%EB%B2%95ㄹ
  } else if (pathname === '/update') {
    fs.readdir('./data', function (error, files) {
      var filteredId = path.parse(queryData.id).base
      fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        var title = queryData.id
        var list = templateObj.list(files)
        var template = templateObj.html(title, list, `
          <h2>${title}</h2>
          <p>${description}</p>
          <form action="/update_process" method="post">
            <input type="hidden" name="oldTitle" value="${title}">
            <p><input type="text" name="newTitle" placeholder="title" value=${title}></p>
            <p>
              <textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">Create</a> <a href="/update?id=${title}">Update</a>
          `)
        console.log('update response::', response)
        response.writeHead(200);
        response.end(template);
        //1. form submission은 각 input name="" 값을 모아서 쿼리 스트링으로 보내는 것임. body = originalId=xx&title=xx2&description=yy2
        //2. 그 다음 qs.parse(body)로 이 쿼리스트링을 object로 만들어줌. post = {updatedId: 'xx', title: 'xx2', description: 'yy2' }
      });
    });
  } else if (pathname === '/update_process') {
    var body = ''; //웹브라우저가 포스트 방식으로 데이터 처리할 때 데이터가 많은 경우를 대비해서
    request.on('data', function (data) { //서버쪽에서 수신할 때마다 이 콜백함수를 호출. 호출할 때 data라는 인자를 통해 수신한 정보를 주어야함. 
      body = body + data; //body에 조금씩 조각 조각 추가해줌.
    });
    request.on('end', function () { //더이상 들어올 정보가 없으면 다음 콜백을 호출해줌.
      var post = qs.parse(body); //post = {oldTitle: 'xx', newTitle: 'xx2', description: 'yy2' }
      var id = post.oldTitle;
      var title = post.newTitle;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (err) { //fs.rename 으로 파일 이름 바꾸고
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) { //fs.writeFile 로 이름 바뀐 파일 안의 내용 덮어쓰기 (overwrite the file by default)
          response.writeHead(302, { Location: `/?id=${title}` }); //response code 302: redirection. 
          response.end();
        })
      })
    });
  } else if (pathname === '/delete_process') { // 누르면 바로 지워지므로 '/delete'는 따로 페이지가 필요 없음. //delete 누르자마자 
    var body = ''; //
    request.on('data', function (data) {
      body = body + data;   // body = {id: x}
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id; // 위의 <form action="/delete_process" method="post"> 에서 description input field 는 생략했기 때문에 객체 내 id만 있음.
      var filteredId = path.parse(id).base
      fs.unlink(`data/${filteredId}`, function (err) {
        response.writeHead(302, { Location: `/` }); //response code 302: redirection. 지워지면 바로 홈으로.
        response.end();
      })
    });
  } else {
    response.writeHead(400);
    response.end('Not found');
  }
});

server.listen(3000); //nodejs의 API