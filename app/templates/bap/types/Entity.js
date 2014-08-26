module.exports = function(){
	this.$type = 'entity';
	this.$name = null;
	this.$parent = null;
	
	this.getNamespace = function(){
		return this.$parent.$namespace;
	};
}