var BapCompilationResult = require('./BapCompilationResult');
var BapError = require('./BapError');
var Compiler = require('./compiler/Compiler');

// Utils
var jsType = require('./utils/JsType');
var stringUtils = require('./utils/StringUtils');

// Install prototype methods
jsType.installPrototypeHas();
jsType.installPrototypeTypeOf();
stringUtils.installPrototypeFormat();

module.exports = function (sources) {
	'use strict';

	// ///////////////////////////////
	// Private properties
	// ///////////////////////////////
	this._logger = console;
	this._sources = sources;
	this._factories = {};

	this.setLogger = function (logger) {
		this._logger = logger;
	};

	/**
	 * Transforms source into compiled form.
	 * 
	 * @returns {BapCompilationResult}
	 */
	this.compile = function () {
		var result = new BapCompilationResult();
		
		var that = this;
		this._sources.forEach(function(sourceStr){
			if (sourceStr === null) {
				result.output.push(new BapError('E6548', '', "Source json is not specified."));
			} else{
				var source = JSON.parse(sourceStr);
				var compiler = new Compiler(source, result, that._factories, that._logger);
				compiler.compile();
			}
		});
		return result;
	};

	// ///////////////////////////////
	// Private members
	// ///////////////////////////////

	// ///////////////////////////////
	// Constructor
	// ///////////////////////////////

};
