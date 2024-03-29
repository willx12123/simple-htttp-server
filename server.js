let http = require('http');
let fs = require('fs');
let url = require('url');
let port = process.argv[2];

if (!port) {
  console.log('请指定端口号好不啦？\n例如：node server.js 8888');
  process.exit(1);
}

let server = http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = '';
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
  }
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let method = request.method;

  console.log(`有人发请求过来了！路径（带查询参数）为：${pathWithQuery}`);

  response.statusCode = 200;
  const filePath = path === '/' ? '/index.html' : path;
  const index = filePath.lastIndexOf('.');
  const suffix = filePath.substring(index);
  const fileTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  };
  response.setHeader('Content-Type', `${fileTypes[suffix]};charset=utf-8`);
  let content;
  try {
    content = fs.readFileSync(`./public${filePath}`);
  } catch {
    content = '文件不存在';
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
});

server.listen(port);
console.log(
  `监听${port}成功，请用在空中转体720度然后用电饭煲打开 http://localhost:${port}`
);
