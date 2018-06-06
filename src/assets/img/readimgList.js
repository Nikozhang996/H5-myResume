const fs = require('fs');

const imgs = fs.readdirSync('./');

let result = [];

imgs.forEach(item => {
  if (/\.(PNG|GIF|JPG)/i.test(item)) {
    result.push('img/' + item);
  }
});

fs.writeFile('./result.json', JSON.stringify(result), 'utf-8',function (res) {
  console.log('isOK');
});
