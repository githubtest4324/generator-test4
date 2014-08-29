var Namespace = require('../types/Namespace');
var BapError = require('../BapError');
var JsType = require('../utils/JsType.js');
var JsonEasyFilter = require('../utils/JsonEasyFilter');
var EntityCompiler = require('../typeCompilers/EntityCompiler.js');

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
					this.compile('{0}.{1}'.format(sourcePath, name), childName, child, res);
				} else{
					// Other element
					var compiler = this.compiler.compilers[child.type];
					compiler.compile('{0}.{1}'.format(sourcePath, name), childName, child, res);
				}			
			}
		};
	
		this._validate = function (sourcePath, name, value, parent) {
			var res = true;
			
			if(!this._allowedTypes(sourcePath, value)){
				res = false;
			}
			
			return res;
		};
		
		/**
		 * Returns true if this namespace contains only properties with 'entity', 'page', 'webService' or no types (other namespaces).
		 */
		this._allowedTypes = function(sourcePath, namespace){
			var isAllowed = true;
			// console.log(this.compiler.result);
			var output = this.compiler.result.output;
			JsonEasyFilter.filter(namespace, function(node){
				if(node.level==1){
					if(node.value.typeOf()!==JsType.OBJECT){
						isAllowed = false;
						output.push(new BapError("{0}.{1}".format(sourcePath, node.getPathStr()), "Only objects allowed as top level elements.".format(node.value.type)));
					} else 	if(! (!node.value.type || node.value.type===EntityCompiler.type)){
						isAllowed = false;
						output.push(new BapError("{0}.{1}".format(sourcePath, node.getPathStr()), "Type '{0}' not allowed for a top level element.".format(node.value.type)));
					}
				}
			});
	
			return isAllowed;
		};

	}

}
