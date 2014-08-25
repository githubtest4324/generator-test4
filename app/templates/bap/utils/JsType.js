module.exports = {
	STRING: 'string',
	ARRAY: 'array',
	OBJECT: 'object',
	FUNCTION: 'function',
	NUMBER:'number',
	/**
	 * Returns the javascript type of an object.
	 * @param obj
	 * @returns {string}
	 */
	get: function (obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}

}
