var fs = require("fs");
var content = fs.readFileSync('./bap.json');
var JsonEasyFilter = require('./templates/bap/utils/JsonEasyFilter.js');


var obj = eval('(' + content + ')');
var res = JsonEasyFilter.filter(obj, function(node){
	if(node.key ==='ecom'){
		return node;
	}
});


console.log(res);

