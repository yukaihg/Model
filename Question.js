var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost');
	index = db.index('big-data/magic-cards');	//we will use presenter/questions

var Question = function(){
}

//create a new question
Question.prototype.put = function(JSON, callback){

}

//search based on uid
Question.prototype.get = function(uid, callback){

	//need a query builder
	var data = {
		query: {
			match_all: { }
		},
		from: 0,
		size: 20,
		sort: [  ],
		facets: { }
	};

	index.search(data, function(err, data){console.log(data)});
}

//update a uid
Question.prototype.post = function(uid, callback){

}

//delete a uid
Question.portotype.delete = function(uid, callback){

}

module.exports = new Question;
