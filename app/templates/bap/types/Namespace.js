module.exports = function(){
	this.$type = 'namespace';
	this.$isDefault = false;
	/**
	 * Fully qualified namespace name.
	 */
	this.$namespace = null;
	
	/**
	 * Only the name part of the namespace.
	 */
	this.$name = null;
	
	/**
	 * Parent namespace or root
	 */
	this.$parent = null;
	
	
	this.toString = function(){
		return "Namespace: {0}".format(this.$namespace);
	}
}