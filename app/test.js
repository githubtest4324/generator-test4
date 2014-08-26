
	var jsType = require('./templates/bap/utils/JsType')
	var stringUtils = require('./templates/bap/utils/StringUtils')



stringUtils.installPrototypeFormat();

var getElement = function(tree, path){
		if(!path){
			return tree;
		}

		var names = path.split('.');
		var currentObj = tree;
		names.forEach(function(element, index, array){
			if(currentObj === null){
				currentObj = tree[element];
			} else{
				currentObj = currentObj[element];
			}
		});
		return currentObj;
	};


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


