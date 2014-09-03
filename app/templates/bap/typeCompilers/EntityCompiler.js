var Entity = require('../types/Entity');
var EntityProperty = require('../types/EntityProperty');
var JsType = require('../utils/JsType');
var BapError = require('../BapError');

module.exports = {
	type: 'entity',
	compiler: function(compilerParam){
		this.type = 'entity';
		this.compiler = compilerParam;
		this.compile = function(srcNode, parent){
			var name = srcNode.key;
			var value = srcNode.value;
			this._validate(srcNode, parent);
			
			var res = new Entity();
			parent[name] = res;
			res.$name = name;
			res.$parent = parent;
			
			// Add properties
			for(var propSrcName in value.properties){
				var propSrc = value.properties[propSrcName];
				var property = new EntityProperty();
				res[propSrcName] = property;
				property.$name = propSrcName;
				
				if(propSrc.typeOf()===JsType.STRING){
					// Inline property
					property.$type = propSrc;
					property.$translate = propSrcName;
				} else{
					// Expanded property
					property.$type = propSrc.type;
					if(propSrc.hasProp('translate')){
						property.$translate = propSrc.translate;
					}
					if(propSrc.hasProp('itemType')){
						property.$itemType = propSrc.itemType;
					}
					if(propSrc.hasProp('translate')){
						property.$translate = propSrc.translate;
					} else{
						property.$translate = propSrcName;
					}
				}
			}
			
		};
	
		this._validate = function (srcNode) {
			var output = this.compiler.result.output;
			var valid = true;
			// Type is mandatory
			if(!srcNode.has('type')){
				output.push(new BapError(srcNode.path, "'type' is missing"));
				valid = false;
			} else if(srcNode.get('type').getType()!==JsType.STRING){
				output.push(new BapError(srcNode.path, "Invalid type '{0}'. Only strings allowed.".format(srcNode.get('type').getType())));
				valid = false;
			}

			// Name is mandatory
			if(!srcNode.has('name')){
				output.push(new BapError(srcNode.path, "'name' is missing"));
				valid = false;
			} else if(srcNode.get('name').getType()!==JsType.STRING){
				output.push(new BapError(srcNode.path, "Invalid type '{0}'. Only strings allowed.".format(srcNode.get('name').getType())));
				valid = false;
			}

			// Properties is mandatory
			if(!srcNode.has('properties')){
				output.push(new BapError(srcNode.path, "'type' is missing"));
				valid = false;
			} else if(srcNode.get('properties').getType()!==JsType.OBJECT){
				output.push(new BapError(srcNode.path, "Invalid type '{0}'. Only objects allowed.".format(srcNode.get('properties').getType())));
				valid = false;
			} else{
				// Validate each property
				srcNode.get('properties').validate(){
					TODO
				}
				
			}

			return valid;
		};
	
	}
	
};

