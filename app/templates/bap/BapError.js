
module.exports = function BapError (pathParam, messageParam) {
	'use strict';
	this.type = 'error';
	this.message = messageParam || '';
	this.path = pathParam || [];
	this.toString = function () {
		return 'Error at ' + this.path + ': ' + this.message;
	};
};