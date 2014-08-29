var Namespace = require('../types/Namespace');
var BapError = require('../BapError');

module.exports ={
	type: 'namespace',
	compiler: function (compilerParam){
		this.type = 'namespace';
		this.compiler = compilerParam;
	
		this.compile = function(sourcePath, name, value, parent){
			if(!this._validate(sourcePath, name, value, parent)){
				return;
			}
			
			// Build namespace element
			var res = new Namespace();
			parent[name] = res;
			res.$name = name;
			res.$parent = parent;
			if(parent.has('$type') && parent.$type===this.type){
				// Has namespace parent
				res.$namespace = "{0}.{1}".format(parent.$namespace, name);
			} else{
				// Has root parent
				res.$namespace = name;
			}
	
			// Compile children
			for(var childName in value){
				var child = value[childName];
				if (!value[childName].has('type')) {
					// Namespace
					this.compile('', childName, child, res);
				} else{
					// Other element
					var compiler = this.compiler.compilers[child.type];
					compiler.compile('{0}.{1}'.format(sourcePath, name), childName, child, res);
				}			
			}
		};
	
		this._validate = function (sourcePath, name, value, parent) {
			
			// Namespace has to be an object
			// if(value.typeOf()!==JsType.)
			// todo
			
			// if(path){
			// 	var names = (path?path.split('.'): null) || [];
			// 	var currentPath = '';
			// 	names.forEach(function(pathElem){
			// 		currentPath+=pathElem;
			// 		var elem = compiler.getCompiledElement(currentPath);
			// 		if(elem.type!=Namespace.type){
			// 			result.output.push(new BapError('Namespace "{0}" has ancestors that are not namespaces. See "{1}" which is an "{2}".', path));
			// 		}
			// 	});
			// }
		};
	
	}

}
