var traverse = require("traverse");

var JsonNode = function(){
	this.key = null;
	this.value = null;
	this.parent = null;
	this.isRoot = null;
	this.path = [];
	this.isLeaf = null;
	this.circular = null;
	this.level = null;
	this.getPathStr = function(delimiter){
		if(!delimiter){
			delimiter = '.';
		}
		var res = '';
		for(var i = 0; i<this.path.length; i++){
			if(i!==0){
				res+=delimiter;
			}
			res+=this.path[i];
		}
		return res;
	};
};


module.exports = {
	
	filter: function(obj, callback){
		var result = {};
		traverse(obj).forEach(function(val){
			// console.log(val);
			var node = new JsonNode();
			node.path = this.path;
			node.key = this.key;
			node.value = this.node;
			node.level = this.level;
			node.isRoot = this.isRoot;
			callback(node, result);
		});
		return result;
	}

}