//TODO: map result to Question model

var queryES = require('./queryES.js');
var question = require('./models/question.js');
var comment = require('./models/comment.js');

//NOTE**
//for types, 0 = presenter, 1 = accent

//////////////////////////////////////////////////////////////////////////////////////////////////
// Questions 
//////////////////////////////////////////////////////////////////////////////////////////////////


//*****************GET a question***********************
//@params: questionID, type, callback
/*
queryES.getQuestion('aJfzndwdadddQuOicWWAjx7F00', 1, function(result){
	console.log(result);
});
*/

//*****************GET all question by user uuid********
/*
NOTE:
For testing purposes we are using username INSTEAD of user uuid,
so that results are meaningful
*/

//@params: userID, type, callback
/*
queryES.getAllQuestionByUserID('jbo1', 0, function(result){
	//You should get 2 sets of result
	//console.log('Found: ' + result.total);
	//console.log(JSON.stringify(result.hits));

	console.log(result);
})
*/

//*****************SEARCH all based on project type*****
var searchString = 'the fuck';

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

//*****************FOLLOW a question***********************
//Question model takes in (questionID, userID, type, category)

//@params: question model, type, callback
/*
 queryES.addFollower('pJfzndwdadddQuOicWWAjx7F00', 'dddgg', 0, function(){
 console.log("Follower added, check ES");
 });
*/

//*****************UPDATE a question**********************
//@params: questionID, questionBody, type, callback
/*
queryES.updateQuestion('pJfzndwdadddQuOicWWAjx7F00', 'Z for question', 0, function(){
	console.log("Question updated, check ES");
});
*/

//*****************DELETE a question***********************
//@params: questionID, type, callback
/*
queryES.deleteQuestion('someuidlololol', 0, function(){
	console.log("Question deleted");
})
*/

//////////////////////////////////////////////////////////////////////////////////////////////////
// Comments 
//////////////////////////////////////////////////////////////////////////////////////////////////

//*****************GET a comment***********************
//@params: commentID, type, callback
/*
queryES.getComment('aJfzggggguOicWWAjx7F05', 1, function(result){
	console.log(result);
});
*/

//*****************GET all comments by user uuid********

//@params: userID, type, callback
/*
queryES.getAllCommentByUserID('zoro', 0, function(result){
	//You should get 2 sets of result
	console.log('Found: ' + result.total);
	console.log(JSON.stringify(result.hits));
})
*/

//*****************ADD a comment***********************
//Comment model takes in (commentID, userID, commentBody)
var comment = new comment('universal', 'zoro', 'Spaniards');

//@params: comment model, type, callback
/*
queryES.addComment(comment, 0, function(){
	console.log("Comment added, check ES");
});
*/

//*****************UPDATE a comment**********************
//@params: commentID, commentBody, type, callback
/*
queryES.updateComment('universal', 'toy story', 0, function(){
	console.log("Comment updated, check ES");
});
*/

//*****************DELETE a comment***********************
//@params: commentID, type, callback
/*
queryES.deleteComment('universal', 0, function(){
	console.log("Comment deleted");
})
*/

//*****************Append a commentID to a question***********************
//
// Ignore appendCommentID and deleteCommentID for now.
// This needs to be discussed together.
//
//@params: questionID, commentID, type, callback
/*
queryES.appendCommentID("","", type, function() {
	console.log("CommentID appended to the Question");
});
*/

//*****************Delete a commentID from a question***********************
//@params: questionID, commentID, callback
/*
queryES.deleteCommentID("","", function() {
	console.log("CommentID deleted from the Question");
});
*/

//*****************Update comment's vote***********************
//@params: commentID, direction, type, callback
/*
queryES.updateVote('zzz123', 1, 0, function() {
	console.log("Comment vote updated");
});
*/
