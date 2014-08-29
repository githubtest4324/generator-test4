var BapCompilationResult = require('./BapCompilationResult');
var BapError = require('./BapError');
var BapWarning = require('./BapWarning');
var Compiler = require('./compiler/Compiler');

// Utils
var jsType = require('./utils/JsType')
var stringUtils = require('./utils/StringUtils')


// Install prototype methods
jsType.installPrototypeHas();
jsType.installPrototypeTypeOf();
stringUtils.installPrototypeFormat();



module.exports = function (source) {

	/////////////////////////////////
	// Private properties
	/////////////////////////////////
	this._logger = console;
	this._source = JSON.parse(source);
	this._factories = {};

    this.setLogger = function (logger) {
        this._logger = logger;
    };

	/**
	 * Transforms source into compiled form.
	 * @returns {BapCompilationResult}
	 */
    this.compile = function () {
        var result = new BapCompilationResult();
        if (this._source === null) {
            result.output.push(new BapError("Source json is not specified.", null));
        }
		var compiler = new Compiler(this._source,  result, this._factories, this._logger);
        compiler.compile();
        return result;
    };

	/////////////////////////////////
    // Private members
    /////////////////////////////////

	/////////////////////////////////
	// Constructor
	/////////////////////////////////


};

