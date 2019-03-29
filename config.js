var fs = require("fs");

var globalConfig = {};
let os = require("os")

var conf = fs.readFileSync("./server.conf");
var confArr = conf.toString().split(os.EOL);
console.log(confArr)
for(var i = 0 ; i < confArr.length;i ++){
    if(confArr[i]){
        globalConfig[confArr[i].split("=")[0]] = confArr[i].split("=")[1]
    }

}


module.exports = globalConfig

