var JsonEasyFilter = require('./JsonEasyFilter');

var json = {
	departments : {
		admin : {
			name : "Administrative",
			manager : 'john'
		},
		it : {
			name : 'IT',
			manager : 'andy'
		},
		finance : {
			name : 'Financiar',
			manager : 'anna'
		}
	},
	employees : [ {
		username : 'john',
		firstName : 'John',
		lastName : 'JOHN',
		salary : 150,
		gender : 'M',
		birthDate : '1980/05/21'
	}, {
		username : 'andy',
		firstName : 'Andy',
		lastName : 'ANDY',
		salary : 200,
		gender : 'M',
		birthDate : '1985/10/30'
	}, {
		username : 'anna',
		firstName : 'Anna',
		lastName : 'ANNA',
		salary : 300,
		gender : 'F',
		birthDate : '1989/08/05'
	}, {
		username : 'gaby',
		firstName : 'Gaby',
		lastName : 'GABY',
		salary : 400,
		gender : 'M',
		birthDate : '1993/11/20'
	}, {
		username : null,
		firstName : 'Gaby',
		lastName : 'GABY',
		salary : 400,
		gender : 'M',
		birthDate : '1993/11/20'
	} ]
};

/**
 * Get all employee username with a salary over 200.
 */
function test1() {
	var res = JsonEasyFilter(json).filter(function(node) {
		if (node.hasOwnProperty('username')) {
			return node.value.username;
		}
	});
	var testResult = res.toString() === [ 'john', 'andy', 'anna', 'gaby' ].toString();
	return testResult;
};

function test2() {
	var res = JsonEasyFilter(json).get('departments.admin').filter(
			function(node) {
				if (node.value.manager === 'john') {
					return node.value.manager;
				}
			});
	var testResult = res.toString() === [ 'john' ].toString();
	return testResult;
}

function runTests(){
	var res = test1();
	console.log('Test1: ' + res);
	var res = test2();
	console.log('Test2: ' + res);
}

console.log('start');
//test1();
runTests();