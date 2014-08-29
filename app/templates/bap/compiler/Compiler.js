var BapError = require('../BapError');
var BapWarning = require('../BapWarning');
var Namespace = require('../types/Namespace');
var NamespaceCompiler = require('../typeCompilers/NamespaceCompiler.js');
var EntityCompiler = require('../typeCompilers/EntityCompiler.js');
var JsType = require('../utils/JsType.js');
var JsonEasyFilter = require('../utils/JsonEasyFilter');

module.exports = function Compiler(sourceParam, resultParam, loggerParam){
	this.compilers = {};
	this.logger = loggerParam;
	this.source = sourceParam;
	this.result = resultParam;

	/**
	 * @param source Source file.
	 * @param result Object to write compiled code into.
	 * @param path Currently processed path
	 * @param compilers List of type compilers
	 */
	this.compile = function () {
		var defaultNamespace = new Namespace();
		defaultNamespace.$isDefault = true;
		defaultNamespace.$namespace = '';
		defaultNamespace.$name = '';
		defaultNamespace.$parent = this.result.compiled;

		// Build default list of compilers
		this.compilers[NamespaceCompiler.type] = new NamespaceCompiler.compiler(this);
		this.compilers[EntityCompiler.type] = new EntityCompiler.compiler(this);

		if(!this._validateTopLevelElements()){
			return;
		}

		var usesDefaultNamespace = false;
		for (var name in this.source) {
			if (!this.source[name].has('type')) {
				// Namespace
				var namespaceCompiler = this.compilers[NamespaceCompiler.type];
				namespaceCompiler.compile('', name, this.source[name], this.result.compiled);
			} else{
				// Other element
				var factory = this.compilers[this.source[name].type];
				if(factory){
					factory.compile('', name, this.source[name], defaultNamespace);
					usesDefaultNamespace = true;
				} else{
					this.result.output.push(new BapError(name, 'Unknown type "{0}"'.format(this.source[name].type)));
				}
			}
		}
		
		if(usesDefaultNamespace){
			this.result.compiled['defaultNamespace'] = defaultNamespace;
		}
	};

	this._validateTopLevelElements = function(){
		var res = true;
		var root = this.source;
		var output = this.result.output;

		if(!root){
			output.push(new BapError('', 'No content was received to be compiled'));
			res = false;
		}
		

		// Must be an object
		if(root.typeOf()!=JsType.OBJECT){
			output.push(new BapError('', 'Received source content must be a complex json object. The one received is of type "{0}"'.format(root.typeOf())));
			res = false;
		}
		
		// 'type' not allowed as root element.
		if(root.has('type')){
			output.push(new BapError('', '"type" is not allowed as top level element'));
			res = false;
		}
		
		// May contain only 
		if(!this._allowedTypes(root)){
			res = false;
		}
		
		return res;
	};
	
	/**
	 * Returns true if 'root' contains only properties with 'entity', 'page', 'webService' or no types.
	 */
	this._allowedTypes = function(root){
		var isAllowed = true;
		var output = this.result.output;
		JsonEasyFilter.filter(root, function(node){
			if(node.level==1){
				if(node.value.typeOf()!==JsType.OBJECT){
					isAllowed = false;
					output.push(new BapError(node.getPathStr(), "Only objects allowed as top level elements.".format(node.value.type)));
				} else 	if(! (!node.value.type || node.value.type===EntityCompiler.type)){
					isAllowed = false;
					output.push(new BapError(node.getPathStr(), "Type '{0}' not allowed for a top level element.".format(node.value.type)));
				}
			}
		});

		return isAllowed;
	};
	
	this.getCompiledElement = function(path){
		return this._getElement(this.result.compiled, path);
	};

	this.getSourceElement = function(path){
		return this._getElement(this.source, path);
	};
	this._getElement = function(tree, path){
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

};