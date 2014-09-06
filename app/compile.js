var fs = require('fs');

var sourceRoot = "./templates";


var BapCompiler = require(sourceRoot + '/bap/BapCompiler');
require(sourceRoot + '/bap/typeCompilers/NamespaceCompiler');
require(sourceRoot + '/bap/typeCompilers/EntityCompiler');

var bap1 = fs.readFileSync('bap1.json', 'utf-8');
var bap2 = fs.readFileSync('bap2.json', 'utf-8');
var compiler = new BapCompiler([bap1, bap2]);
var result = compiler.compile();

console.log(result.toString());

if (result.output.length > 0) {
	result.output.forEach(function (val) {
		'use strict';
		console.log(val.toString());
	});
}
