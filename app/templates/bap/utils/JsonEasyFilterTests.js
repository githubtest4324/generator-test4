var JsonEasyFilter = require('./JsonEasyFilter');

var json = {
	departments : {
		admin: {
			name: "Administrative",
			manager: 'john'
		},
		it: {
			name: 'IT',
			manager: 'andy'
		},
		finance: {
			name: 'Financiar',
			manager: 'anna'
		}
	},
	employees: [
		{
			username: 'john',
			firstName: 'John',
			lastName: 'JOHN',
			salary: 150,
			gender: 'M',
			birthDate: '1980/05/21'
		},
		{
			username: 'andy',
			firstName: 'Andy',
			lastName: 'ANDY',
			salary: 200,
			gender: 'M',
			birthDate: '1985/10/30'
		},
		{
			username: 'anna',
			firstName: 'Anna',
			lastName: 'ANNA',
			salary: 300,
			gender: 'F',
			birthDate: '1989/08/05'
		},
		{
			username: 'gaby',
			firstName: 'Gaby',
			lastName: 'GABY',
			salary: 400,
			gender: 'M',
			birthDate: '1993/11/20'
		},
	]
};

/**
 * Get all employees with a salary over 200.
 */
function test1(){
	JsonEasyFilter.filter(json, function(node){
		if(node.key=='employees'){
			JsonEasyFilter.filter(node.value);
		}
	});
};

	JsonEasyFilter.filter(json.employees, function(node){
		console.log(node.key);
	});

