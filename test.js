var questionES = require('./QuestionES.js');

//*****************INSERT***********************

//assume this is the json data from the client
var sampleData = {
	'user':'bob',
	'body':'Why so serious?',
	'category':'misc',
	'commentIDs':[],
	'status':'unanswered'
};

//params: string object, callback function
/*
questionES.put(sampleData, function(result){
	console.log('ES generated ID is: ' + JSON.stringify(result._id));
});
*/

//*****************GET question data by ID********************
//params: comment uid, callback function

//FOR EXAMPLE IF the question ID is: m119sa8YQxuOSKdhQ86SqA
/*
questionES.getQuestion('m119sa8YQxuOSKdhQ86SqA', function(data){
	console.log("Question data: " + JSON.stringify(data));
});
*/

//*****************ADD COMMENT ID********************

//params: question uid, comment uid, callback function
/*
questionES.postComment('m119sa8YQxuOSKdhQ86SqA', 'eeewadsdddddddddd', function(){
	console.log("Sample comment ID posted");
});
*/

//*****************SEARCH***********************
//some search query for example
/*
//params: string query, callback function
questionES.get('buy Math 101', function(data){
	console.log('Number of documents found: '+ JSON.stringify(data.hits.total));
});
*/

//*****************DELETE***********************

//params: question uid, callback function
/*
 questionES.delete('m119sa8YQxuOSKdhQ86SqA', function(){
 console.log('Question removed');
 });
*/