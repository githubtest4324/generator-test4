var Entity = require('../types/Entity');
var EntityProperty = require('../types/EntityProperty');
var JsType = require('../utils/JsType');

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
			// todo: all ancestors must be namespaces.
		};
	
	}
	
};

