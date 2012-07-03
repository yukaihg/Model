//TODO: QUERY BUILDER

var questionES = require('./QuestionES.js'),
	Question = require('./Question.js');


//*****************SEARCH***********************
//some search query for example
var searchData = {
	query: {
		match_all: { }
	},
	from: 0,
	size: 20,
	sort: [  ],
	facets: { }
};

questionES.get(searchData, function(){});

//*****************INSERT***********************
var insertData = {
	'_id':'someID',
	'_source': {'someKey':'someValue'}
};

//inserting into es
questionES.put(insertData, function(){});


//*****************DELETE***********************

//deleting this uid
questionES.delete(insertData._id);