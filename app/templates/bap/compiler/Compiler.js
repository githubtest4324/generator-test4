var BapError = require('../BapError');
var BapWarning = require('../BapWarning');
var Namespace = require('../types/Namespace');
var NamespaceCompiler = require('../typeCompilers/NamespaceCompiler.js');
var EntityCompiler = require('../typeCompilers/EntityCompiler.js');

module.exports = function Compiler(sourceParam, resultParam, loggerParam){
	this.compilers = {};
	this.logger = loggerParam;
	this.source = sourceParam;
	this.result = resultParam;

	/**
	 * @param source Source file.
	 * @param result Object to write compiled code into.
	 * @param path Currently processed path
	 * @param compilers List of type compilers
	 */
	this.compile = function () {
		var defaultNamespace = new Namespace();
		defaultNamespace.$isDefault = true;
		defaultNamespace.$namespace = '';
		defaultNamespace.$name = '';
		this.result[''] = defaultNamespace;

		// Build default list of compilers
		this.compilers[NamespaceCompiler.type] = new NamespaceCompiler.compiler(this);
		this.compilers[EntityCompiler.type] = new EntityCompiler.compiler(this);

		this._validateTopLevelElements();

		for (var name in this.source) {
			if (!this.source[name].has('type')) {
				// Namespace
				var namespaceCompiler = this.compilers[NamespaceCompiler.type];
				namespaceCompiler.compile('', name, this.source[name], this.result.compiled);
			} else{
				// Other element
				var factory = this.compilers[this.source[name].type];
				factory.compile('', name, this.source[name], defaultNamespace);
			}
		}
	};

	/**
	 * Allowed top level elements: namespaces, entities, webservices, pages
	 */
	this._validateTopLevelElements = function(){
		// todo
		// for (var val in value) {
			// if (value[val].has('type')) {
			// 	var factory = this.compilers[value[val].type];
			// 	factory.compile(value, this.result, path, val, value[val], this);
			// } else{
			// 	this.result.output.push(new BapError("Type is not defined", path+(path?'.':'')+val));
			// }
		// }
	};
	
	this.getCompiledElement = function(path){
		return this._getElement(this.result.compiled, path);
	};

	this.getSourceElement = function(path){
		return this._getElement(this.source, path);
	};
	this._getElement = function(tree, path){
		if(!path){
			return tree;
		}

		var names = path.split('.');
		var currentObj = tree;
		names.forEach(function(element, index, array){
			if(currentObj === null){
				currentObj = tree[element];
			} else{
				currentObj = currentObj[element];
			}
		});
		return currentObj;
	};

};