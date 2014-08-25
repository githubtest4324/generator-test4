var BapError = require('../BapError');
var BapWarning = require('../BapWarning');

module.exports = function Compiler(sourceParam, resultParam, factoriesParam, loggerParam){
	this.factories = factoriesParam;
	this.logger = loggerParam;
	this.source = sourceParam;
	this.result = resultParam;

	/**
	 * @param source Source file.
	 * @param result Object to write compiled code into.
	 * @param path Currently processed path
	 * @param factories List of type factories
	 */
	this.compile = function (path) {
		for (var val in this.source) {
			if (this.source[val].hasOwnProperty('type')) {
				var factory = this.factories[this.source[val].type];
				factory.compile(this.source, this.result, path, val, this.source[val], this);
			} else{
				result.output.push(new BapError("Type is not defined", path+'/'+val));
				logger.log();
			}
		}
	};


	/**
	 * Returns the javascript type of an object.
	 * @param obj
	 * @returns {string}
	 */
	this.jsType = function (obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
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
			if(currentObj == null){
				currentObj = tree[element];
			} else{
				currentObj = currentObj[element];
			}
		});
		return currentObj;
	};

}