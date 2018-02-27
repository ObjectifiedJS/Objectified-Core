var fs = require('fs'),
	onlyScripts = require('./utils/scriptFilter'),
	tasks = fs.readdirSync('./tools/gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
	require('./tasks/' + task);
});
