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

var bapCompiler = require(this.sourceRoot() + '/bap/BapCompiler')

//include(this.sourceRoot() + '/bap/BapCompiler.js');
//include(this.sourceRoot() + '/bap/date.js');
//include(this.sourceRoot() + '/bap/entity.js');
//include(this.sourceRoot() + '/bap/EntityProperty.js');
//include(this.sourceRoot() + '/bap/list.js');
//include(this.sourceRoot() + '/bap/num.js');
//include(this.sourceRoot() + '/bap/obj.js');
//include(this.sourceRoot() + '/bap/str.js');


var bap = fs.readFileSync(this.bapFile, 'utf-8');
bapCompiler.setSource(bap);
var result = bapCompiler.compile();
for(output in result.output){
    console.log(result.output[output].toString());
}
