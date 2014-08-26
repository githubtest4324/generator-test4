module.exports = function(){
	this.type = 'namespace';
	this.isDefault = false;
	/**
	 * Fully qualified namespace name.
	 */
	this.namespace = null;
	
	/**
	 * Only the name part of the namespace.
	 */
	this.name = null;
}