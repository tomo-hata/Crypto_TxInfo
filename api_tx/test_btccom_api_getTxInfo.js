/* txidをファイルから読み込みkeyにしてbtc.comのAPIを叩き、結果をファイルに書き出す。 */
var request = require("request");
var fs = require('fs');
var async = require('async');
var jsonfile = require('jsonfile');
var array = [];
var array_opt = [];
var api_result;
var url;
async.waterfall([
  function(next) {
    setTimeout(function() {
      array = fs.readFileSync('./api_tx/read_txList.txt').toString().split("\n");
      for(num in array) {
        //console.log(array[num]);
      }
      next(null,1);
    }, 1000);
  },
  function(result,next) {
    fs.appendFileSync('./api_tx/write_result_tx.json', '{' + '\n', 'utf-8');
    setTimeout(function() {
      var array_num =1;
      async.forEachSeries(array, function (value, callback2) {
        console.log(value);
        url = 'https://chain.api.btc.com/v3/tx/' + String(value).replace("\r","") + '?verbose=3'
        console.log("processing: " + array_num + " / " + array.length);
        /* Apiを呼び出す */
        api_result = ApiGet(url,array_num,array.length);
        array_num = array_num + 1;
        setTimeout(callback2,1000);
      }, function (err, array) {
      });
      next(null,1,2);
    }, 1000);
  }
], function(err) {
/* 途中でnext(err)すると、ここに飛んでerrが入る。 */
//console.log("test");
})
/* REST-API: GET */
function ApiGet(url,array_num,max_array_num){
  var options = { method: 'GET',
  url: url,
  /* proxyは必要に応じて指定。 */
  //proxy: 'http://proxy.xxx:[port]',
  headers:
  { accept: 'application/json' } };
  request(options, function (error, response, body) {
    if (error) return console.error('Failed: %s', error.message);
    if (array_num == max_array_num) {
      fs.appendFileSync('./api_tx/write_result_tx.json', '"data' + array_num + '":' + body + '}\n', 'utf-8', (error));
    } else {
      fs.appendFileSync('./api_tx/write_result_tx.json', '"data' + array_num + '":' + body + ',\n', 'utf-8', (error));
    }
    return body;
  });
}


