var BapError = require('../BapError');
var BapWarning = require('../BapWarning');

module.exports = function Compiler(){
	/**
	 *
	 * @param source Source file.
	 * @param result Object to write compiled code into.
	 * @param path Currently processed path
	 * @param factories List of type factories
	 */
	this.compile = function (source, result, path, factories) {
		for (var val in source) {
//			console.log("Current path: " + val);
			var currentPath = path + "/" + val;
			if (!source[val].hasOwnProperty('type')) {
				result.output.push(new BapError("Type is not defined", currentPath));
				console.log();
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

}