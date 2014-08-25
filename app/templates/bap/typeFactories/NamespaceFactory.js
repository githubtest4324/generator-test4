var Namespace = require('../types/Namespace');
var BapError = require('../BapError');

module.exports = function NamespaceFactory(){
	this.type = 'namespace';
	/**
	 * @param compiler {Compiler}
	 * 
	 */
	this.compile = function(source, result, path, name, value, compiler){
		this._validate(source, path, name, value, compiler);
		var parent = compiler.getCompiledElement(path);
		if(!parent[name]){
			parent[name] = new Namespace();
		}
	};

	this._validate = function (source, path, element, compiler) {
		if(path){
			var names = (path?path.split('.'): null) || [];
			var currentPath = '';
			names.forEach(function(pathElem){
				currentPath+=pathElem;
				var elem = compiler.getCompiledElement(currentPath);
				if(elem.type!=Namespace.type){
					result.output.push(new BapError('Namespace '));
				}
			});
		}
		// todo: all ancestors must be namespaces.
	};

};
