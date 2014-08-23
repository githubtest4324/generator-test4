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

};

