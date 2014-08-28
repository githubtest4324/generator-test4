var fs = require('fs');
var vm = require('vm');

function include(path) {
	var code = fs.readFileSync(path, 'utf-8');
	vm.runInThisContext(code, path);
}

var sourceRoot = "./templates";

var bapFile = process.argv[2];

var BapCompiler = require(sourceRoot + '/bap/BapCompiler');

var bap = fs.readFileSync(bapFile, 'utf-8');
var compiler = new BapCompiler(bap);
var result = compiler.compile();

console.log(result.toString());

if (result.output.length > 0) {
	result.output.forEach(function(val){
		console.log(val.toString());
	});
}



