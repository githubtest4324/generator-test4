var BapCompilationResult = require('./BapCompilationResult');
var BapError = require('./BapError');
var BapWarning = require('./BapWarning');


var bapCompiler = new function () {


    this.setLogger = function (logger) {
        this._logger = logger;
    };
    this.setSource = function (source) {
        this._source = eval('(' + source + ')');
    };
    this.compile = function () {
        var result = new BapCompilationResult();
        if (this._source == null) {
            result.output.push(new BapError("Source json is not specified.", null));
        }
        this._internalCompile(this._source, result, "");
        return result;
    };

    /////////////////////////////////
    // Private members
    /////////////////////////////////
    this._logger = console;
    this._source = null;
    this._log = function (message) {
        this._logger.log(message);
    };


    /**
     *
     * @param source Source file.
     * @param result Object to write compiled code into.
     * @param path Currently processed path
     * @private
     */
    this._internalCompile = function (source, result, path) {
        for (var val in source) {
//			console.log("Current path: " + val);
            var currentPath = path + "/" + val;
            if (!source[val].hasOwnProperty('type')) {
                result.output.push(new BapError("Type is not defined", currentPath));
                console.log();
            }
        }
    };

    this._toType = function (obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    };

};

module.exports = bapCompiler;