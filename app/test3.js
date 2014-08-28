var fs = require("fs");
var content = fs.readFileSync('./bap.json');
var JsonEasyFilter = require('./templates/bap/utils/JsonEasyFilter.js');


var obj = eval('(' + content + ')');
var res = JsonEasyFilter.filter(obj, function(node, res){
	if(node.key ==='ecom'){
		//console.log(node.level);
		res[node.key] = node.value;
	}
});

console.log(res);

