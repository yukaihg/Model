//TODO: QUERY BUILDER

var question = require('./Question.js');

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

question.get(searchData, function(){});

//*****************INSERT***********************
var insertData = {
	'_id':'someID',
	'_source': {'someKey':'someValue'}
};

//inserting into es
question.put(insertData, function(){});


//*****************DELETE***********************

//deleting this uid
question.delete(insertData._id);