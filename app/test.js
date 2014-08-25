var a = {
	x: 'y',
	z: {
		t: 'f'
	}
};


var getElement = function(tree, path){
	if(!path){
		return tree;
	}

	var names = path.split('.');
	var currentObj = tree;
	names.forEach(function(element, index, array){
		if(currentObj == null){
			currentObj = tree[element];
		} else{
			currentObj = currentObj[element];
		}
	});
	return currentObj;
};


console.log(getElement(a, 'x'));