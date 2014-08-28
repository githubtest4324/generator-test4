var jsType = require('./templates/bap/utils/JsType')
var stringUtils = require('./templates/bap/utils/StringUtils')
var traverse = require('traverse');
var fs = require("fs");
var content = fs.readFileSync('./bap.json');


var obj = eval('(' + content + ')');
traverse(obj).forEach(function(x){
	console.log(this.isRoot);	
});

// console.log(obj);