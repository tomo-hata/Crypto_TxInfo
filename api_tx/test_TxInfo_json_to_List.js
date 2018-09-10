// btc.comのAPI実行結果のtxを書き出したJSONファイルからkeyとvalueを再帰的にテキストファイルに吐き出す
var request = require("request");
var fs = require('fs');
/* 読み込みファイルの階層に注意 */
var json = require("./write_result_tx.json");
var json_to_List = function json_to_List(data, callback){
  for (var key in data) {
      callback(key, data[key]);
      if (typeof data[key] === "object") {
        json_to_List(data[key], callback);
      }
  }
}
json_to_List(json, function(key, value) {
  fs.appendFileSync('./api_tx/write_result_tx.txt', key + ":" + value + '\n', 'utf-8');
});
