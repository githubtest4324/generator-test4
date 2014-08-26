var jsonPath = require('JSONPath');
var jsType = require('./templates/bap/utils/JsType')
var stringUtils = require('./templates/bap/utils/StringUtils')



stringUtils.installPrototypeFormat();



var a = {
	x: [],
	y: 2,
	z: {
		t: 'f'
	},
	f: function () {

	}
};


console.log("{0}".format('liviu'));


