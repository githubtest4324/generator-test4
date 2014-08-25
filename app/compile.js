var fs = require('fs');
var vm = require('vm');
function include(path) {
	var code = fs.readFileSync(path, 'utf-8');
	vm.runInThisContext(code, path);
};

this.sourceRoot = function(){
	return "./templates";
};

this.bapFile = process.argv[2];

var BapCompiler = require(this.sourceRoot() + '/bap/BapCompiler')

var bap = fs.readFileSync(this.bapFile, 'utf-8');
var compiler = new BapCompiler(bap);
var result = compiler.compile();
for(output in result.output){
    console.log(result.output[output].toString());
}
