var http = require('http');

var Question = function(){
	this.status = 'unanswered';
	this.options = {
		host: 'localhost',
		port: '9200',
		path: '/_search',
		method: 'POST',
		headers:{'Content-Type':'application/json'}
	}
}

Question.prototype.add = function(JSON, callback){

}

Question.prototype.post = function(uid, callback){
	var request = http.request(this.options, function(response){
		var buffer="";

		response.on('data', function(data){
			buffer+=data;
		});

		response.on('end', function(){
			console.log(buffer);
		});
	});

	request.on('error', function(err){});

	request.write(JSON.stringify({
		query: {
			match_all: { }
		},
		from: 0,
		size: 20,
		sort: [  ],
		facets: { }
	}));

	request.end();
}

Question.prototype.comment = function(uid, callback){

}


module.exports = new Question;
