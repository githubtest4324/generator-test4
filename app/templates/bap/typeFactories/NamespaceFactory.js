var Namespace = require('../types/Namespace');

module.exports = function NamespaceFactory(){
	this.type = 'namespace';
	this.compile = function(source, result, path, name, value, compiler){
//		this._validate(source, path, element, compiler);
		var parent = compiler.getCompiledElement(path);
		if(!parent[name]){
			parent[name] = new Namespace();
		}
	}

	this._validate = function (source, path, element, compiler) {
		// todo: all ancestors must be namespaces.
	};

}
