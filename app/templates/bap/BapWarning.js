module.exports = function BapWarning (messageParam, pathParam) {
	'use strict';
	this.type = 'warning';
	this.message = messageParam || '';
	this.path = pathParam || [];
	this.toString = function () {
		return 'Warning at ' + this.path + ': ' + this.message;
	};
};