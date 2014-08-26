var Entity = require('../types/Entity');

module.exports = {
	type: 'entity',
	compiler: function(compilerParam){
		this.type = 'entity';
		this.compiler = compilerParam;
		this.compile = function(sourcePath, name, value, parent){
			this._validate(sourcePath, name, value, parent);
			
			var res = new Entity();
			res.$name = name;
			
		};
	
		this._validate = function (source, path, element, compiler) {
			// todo: all ancestors must be namespaces.
		};
	
	}
	
}

