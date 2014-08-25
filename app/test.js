var jsType = require('./templates/bap/utils/JsType')

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

var a = {
	x: [],
	y: 2,
	z: {
		t: 'f'
	},
	f: function () {

	}
};


console.log(a.typeOf());