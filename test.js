//TODO: map result to Question model

var queryES = require('./queryES.js');
var question = require('./models/question.js');

//NOTE**
//for types, 0 = presenter, 1 = accent

//*****************GET a question***********************
//@params: questionID, type, callback

queryES.getQuestion('ddd', 0, function(result){
	console.log(result);
});


//*****************GET all question by user uuid********
/*
NOTE:
For testing purposes we are using username INSTEAD of user uuid,
so that results are meaningful
*/

//@params: userID, type, callback
/*
queryES.getAllQuestionByUserID('dddd', 0, function(result){
	//You should get 2 sets of result
	//console.log('Found: ' + result.total);
	//console.log(JSON.stringify(result.hits));

	console.log(result);
})
*/

//*****************SEARCH all based on project type*****
var searchString = 'exercise benefit';

//@params: search string, type, callback
/*
queryES.searchAll(searchString, 0, function(result){
	console.log('Found: ' + result.total);
	console.log(JSON.stringify(result.hits));
})
*/


//*****************ADD a question***********************
//Question model takes in (questionID, userID, questionBody, category)
var question = new question('someuidlololol', 'someUserUUID', 'This is the question i asked', 'life');

//@params: question model, type, callback
/*
queryES.addQuestion(question, 0, function(){
	console.log("Question added, check ES");
});
*/

//*****************UPDATE a question**********************
//@params: questionID, questionBody, type, callback
/*
queryES.updateQuestion('someuidlololol', 'This is my new question', 0, function(){
	console.log("Question updated, check ES");
});
*/

//*****************DELETE a question***********************
//@params: questionID, questionBody, type, callback
/*
queryES.deleteQuestion('someuidlololol', 0, function(){
	console.log("Question deleted");
})
*/
