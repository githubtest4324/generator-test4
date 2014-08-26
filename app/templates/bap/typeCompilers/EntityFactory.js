module.exports = function EntityFactory(){
	this.type = 'entity';
	this.compile = function(source, result, path, element, compiler){
		this._validate(source, path, element, compiler);


	}

	this._validate = function (source, path, element, compiler) {
		// todo: all ancestors must be namespaces.
	};

}
