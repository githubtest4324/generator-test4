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
	this._pathStr = null;
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
	this.get = function(relPathStr){
		var absolutePath;
		if(this.isRoot){
			absolutePath = relPathStr;
		} else{
			absolutePath = this.getPathStr()+'.'+relPathStr;
		}
		return this._nodeHash[absolutePath];
	}
	this.filter = function(callback){
		var result = [];
		for(var absolutePath in this._nodeHash){
			if(absolutePath.indexOf(this._pathStr)===0){
				var node = this._nodeHash[absolutePath];
				var resCallBack = callback(node);
				if(resCallBack){
					result.push(resCallBack);
				}
			}
		}
		return result;
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
	
	this._debugNodeHash = function(){
		for(var absolutePath in this._nodeHash){
			if(absolutePath.indexOf(this._pathStr)===0){
				console.log(absolutePath);
			}
		}
	};
};


module.exports = function(obj){
	this._filter = function(obj, callback){
		var result = [];
		var nodeHash = {};
		traverse(obj).forEach(function(val){
			// console.log(val);
			var node = new JsonNode();
			node._nodeHash = nodeHash;
			node.path = this.path;
			node._pathStr = _getPathStr(node.path);
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
	this._build = function(obj){
		var rootArray = this._filter(obj, function(node){
			if(node.isRoot){
				return node;
			}
		});
		
		return rootArray[0];
	};
	
	return this._build(obj);
};

