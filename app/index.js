'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');
var vm = require('vm');
function include(path) {
	var code = fs.readFileSync(path, 'utf-8');
	vm.runInThisContext(code, path);
}


var Test4Generator = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the superior Test4 generator!'
		));

		var prompts = [
			{
				type: 'confirm',
				name: 'someOption',
				message: 'Would you like to enable this option?',
				default: true
			}
		];

		this.prompt(prompts, function (props) {
			this.someOption = props.someOption;

			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			this.dest.mkdir('app');
			this.dest.mkdir('app/templates');

			this.src.copy('_package.json', 'package.json');
			this.src.copy('_bower.json', 'bower.json');
		},

		art: function () {
			include(this.sourceRoot() + '/art/ArtCompiler.js');
			include(this.sourceRoot() + '/art/date.js');
			include(this.sourceRoot() + '/art/entity.js');
			include(this.sourceRoot() + '/art/EntityProperty.js');
			include(this.sourceRoot() + '/art/list.js');
			include(this.sourceRoot() + '/art/num.js');
			include(this.sourceRoot() + '/art/obj.js');
			include(this.sourceRoot() + '/art/str.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');
//			include(this.sourceRoot() + '/art/.js');

			var art = fs.readFileSync("ecom.art.json", 'utf-8');
			var artCompiler = new ArtCompiler(art);
			artCompiler.compile();
		},

		projectfiles: function () {
			this.src.copy('editorconfig', '.editorconfig');
			this.src.copy('jshintrc', '.jshintrc');
		}
	},

	end: function () {
		this.installDependencies();
	}
});

module.exports = Test4Generator;
