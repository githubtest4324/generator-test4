function ArtCompiler(artFile) {
	this.source = eval('(' + artFile + ')');
//	console.log(this.source);

	this.compile = function () {
		var comp = {};
		this._internalCompile(this.source, comp, "");
		return comp;
	};


	/**
	 *
	 * @param art Source file.
	 * @param comp Object to write compiled code into.
	 * @private
	 */
	this._internalCompile = function (art, comp, path) {
		for (var val in art) {
			console.log("Current path: " + val);
			var currentPath = path + "/" + val;
			if (art[val].type == undefined) {
				console.log("error: type is not defined in " + currentPath);
			}
		}
	}

	this._toType = function (obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	};

};

