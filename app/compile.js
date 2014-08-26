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
if (result.output.length > 0) {
	for (var output in result.output) {
		console.log(result.output[output].toString());
	}
}

console.log(JSON.stringify(result.compiled, null, 4));
