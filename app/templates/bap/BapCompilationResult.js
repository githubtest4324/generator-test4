module.exports = function BapCompilationResult() {
    /**
     * Compiled Bap object.
     */
    this.compiled = {};
    /**
     * List of BapWarning or BapError objects.
     * @type {Array}
     */
    this.output = [];

    this.toString = function(){
        return JSON.stringify(this.compiled, function(key, value){
        	if(key=='$parent'){
        		if(value.has('toString')){
        			return value.toString();
        		}
        		return 'Circular';
        	} else{
        		return value;
        	}
        }, 4);      
    };
};

