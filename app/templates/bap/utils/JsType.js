
var internalJsType = {
	STRING: 'string',
	ARRAY: 'array',
	OBJECT: 'object',
	FUNCTION: 'function',
	UNDEFINED:'undefined',
	NUMBER:'number',
	/**
	 * Returns the javascript type of an object.
	 * @param obj
	 * @returns {string}
	 */
	get: function (obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	},
	
	installPrototypeHas: function(){
		Object.defineProperty(Object.prototype, 'has', {
			enumerable: false,
			value: function (property) {
				return (this.hasOwnProperty(property));
			}
		});
	},
	installPrototypeTypeOf: function(){
		Object.defineProperty(Object.prototype, 'typeOf', {
			enumerable: false,
			value: function (property) {
				return internalJsType.get(this);
			}
		});
	}

};

module.exports = internalJsType;
