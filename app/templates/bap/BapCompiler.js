var BapCompilationResult = require('./BapCompilationResult');
var BapError = require('./BapError');
var BapWarning = require('./BapWarning');
var Compiler = require('./compiler/Compiler');

// Type factories
var EntityFactory = require('./typeFactories/EntityFactory.js');
var NamespaceFactory = require('./typeFactories/NamespaceFactory.js');

// Utils
var jsType = require('./utils/JsType')


Object.defineProperty(Object.prototype, 'has', {
	enumerable: false,
	value: function (property) {
		return (this.hasOwnProperty(property));
	}
});

Object.defineProperty(Object.prototype, 'typeOf', {
	enumerable: false,
	value: function (property) {
		return jsType.get(this);
	}
});



module.exports = function (source) {

	/////////////////////////////////
	// Private properties
	/////////////////////////////////
	this._logger = console;
	this._source = eval('(' + source + ')');
	this._factories = {};

    this.setLogger = function (logger) {
        this._logger = logger;
    };
	this.addTypeFactory = function(factory){
		this._factories[factory.type] = factory;
	};

	/**
	 * Transforms source into compiled form.
	 * @returns {BapCompilationResult}
	 */
    this.compile = function () {
        var result = new BapCompilationResult();
        if (this._source == null) {
            result.output.push(new BapError("Source json is not specified.", null));
        }
		var compiler = new Compiler(this._source,  result, this._factories, this._logger);
        compiler.compile("");
        return result;
    };

	/////////////////////////////////
    // Private members
    /////////////////////////////////
    this._logger = console;
	this._source = eval('(' + source + ')');
    this._log = function (message) {
        this._logger.log(message);
    };

	/////////////////////////////////
	// Constructor
	/////////////////////////////////
	// Build default list of factories
	this.addTypeFactory(new EntityFactory());
	this.addTypeFactory(new NamespaceFactory());


};

