var fs = require('fs');
var vm = require('vm');
function include(path) {
	var code = fs.readFileSync(path, 'utf-8');
	vm.runInThisContext(code, path);
};

this.sourceRoot = function(){
	return "templates";
};

this.bapFile = process.argv[2];


include(this.sourceRoot() + '/art/ArtCompiler.js');
include(this.sourceRoot() + '/art/date.js');
include(this.sourceRoot() + '/art/entity.js');
include(this.sourceRoot() + '/art/EntityProperty.js');
include(this.sourceRoot() + '/art/list.js');
include(this.sourceRoot() + '/art/num.js');
include(this.sourceRoot() + '/art/obj.js');
include(this.sourceRoot() + '/art/str.js');


var art = fs.readFileSync(this.bapFile, 'utf-8');
var artCompiler = new ArtCompiler(art);
artCompiler.compile();
