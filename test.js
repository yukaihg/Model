var questionES = require('./QuestionES.js');

//*****************INSERT***********************
var insertData = {
	'_id':'someID',
	'_source': {
		'user':'bob',
		'body':'Why so serious?',
		'category':'misc',
		'commentIDs':['aDdwjjd000']
	}
};

//params: string object, callback function
questionES.put(insertData, function(){});

//*****************DELETE***********************

//params: question uid
questionES.delete(insertData._id);

//*****************ADD COMMENT ID********************

//params: question uid, comment uid, callback function
questionES.postComment('someID', 'oooadjd000',function(){});


//*****************GET ALL COMMENT ID********************

//params: comment uid, callback function
questionES.getComment('someID', function(){});


//*****************SEARCH***********************
//some search query for example

//TODO: QUERY BUILDER
var searchData = {
	query: {
		match_all: { }
	},
	from: 0,
	size: 20,
	sort: [  ],
	facets: { }
};

//params: string query, callback function
questionES.get(searchData, function(){});