var traverse = require("traverse");

var _getPathStr = function(path, delimiter){
	if(!delimiter){
		delimiter = '.';
	}
	var res = '';
	for(var i = 0; i<path.length; i++){
		if(i!==0){
			res+=delimiter;
		}
		res+=path[i];
	}
	return res;
};

var JsonNode = function(){
	this._nodeHash = null;
	this.key = null;
	this.value = null;
	this.parent = null;
	this.isRoot = null;
	this.path = [];
	this.isLeaf = null;
	this.circular = null;
	this.level = null;
	this.getPathStr = function(delimiter){
		return _getPathStr(this.path, delimiter);
	};
	this.has = function(key){
		if(!this.value){
			return false;
		}
		if(this.value[key]!==undefined){
			return true;
		} else{
			return false;
		}
	};
	
	this.hasOwnProperty = function(key){
		if(!this.value){
			return false;
		}
		return this.value.hasOwnProperty(key);
	}
};


module.exports = new function(){
	this.filter = function(obj, callback){
		var result = [];
		var nodeHash = {};
		traverse(obj).forEach(function(val){
			// console.log(val);
			var node = new JsonNode();
			node._nodeHash = nodeHash;
			node.path = this.path;
			node.key = this.key;
			node.value = this.node;
			node.level = this.level;
			node.isRoot = this.isRoot;
			var resCallBack = callback(node);
			
			// Hash
			nodeHash[node.getPathStr()] = node;
			
			// Parent
			var parentPath = node.path.slice(0, node.path.length - 1);
			var parentNode = nodeHash[_getPathStr(parentPath)];
			if(parentNode){
				node.parent = parentNode;
			}
			
			if(resCallBack){
				result.push(resCallBack);
			}
		});
		return result;
	};
	this.root = function(obj){
		var rootArray = this.filter(obj, function(node){
			if(node.isRoot){
				return node;
			}
		});
		
		return rootArray[0];
	};
};

