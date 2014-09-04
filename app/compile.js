var fs = require('fs');

var sourceRoot = "./templates";

var bapFile = 'bap.json';

var BapCompiler = require(sourceRoot + '/bap/BapCompiler');
require(sourceRoot + '/bap/typeCompilers/NamespaceCompiler');

var bap = fs.readFileSync(bapFile, 'utf-8');
var compiler = new BapCompiler(bap);
var result = compiler.compile();

console.log(result.toString());

if (result.output.length > 0) {
	result.output.forEach(function (val) {
		'use strict';
		console.log(val.toString());
	});
}
