var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost'),
<<<<<<< HEAD
	indice = ['presenter', 'accent'] //, 'engage', 'rqra'];
	mappings = ['questions', 'comments'];
	index = db.index('presenter'),
	mapping = index.mapping('questions');

var QueryES = function() {	
}

// change the index to whatever you want
var switchIndex = function(type) {
	var indexType = indice[type];
	index = db.index(indexType);
	return indexType;
}

// change the mapping to whatever you want
var switchMapping = function(type) {
	var mappingType = mappings[type];
	mapping = index.mapping(mappingType);
	return mappingType;
=======
	index = db.index('presenter'),
	mapping = index.mapping('questions');

var QueryES = function(){
>>>>>>> 8c444a63c72d9c5af874fc3746d6c13626fcf8f9
}

//get a question
QueryES.prototype.getQuestion = function(questionID, type, callback){
	var link = '/presenter/questions/';

	if(type === 1){
		link = '/accent/questions/';
	}

	link += questionID;

	db.get(link, {}, function(err, req, data){
		callback(data._source);
	});
}

QueryES.prototype.getAllQuestionByUserID = function(userID, type, callback){
	var data = {
		query: {
			bool:{
				must:[{
					term:{
						user: userID
					}
				}]
			}
		},
		from: 0,
		size: 20
	};

	checkType(type);

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits);
		}
		else{
			console.log("User did not ask a question");
		}
	});
}

//search based on query
QueryES.prototype.searchAll = function(search, type, callback){

	if(!search){
		console.log("empty");
		return;
	}

	var data = {
		query: {
			bool:{
				must:[{
					query_string: {
						default_field: '_all',
						query: search
					}
				}]
			}
		},
		from: 0,
		size: 20
	};

	checkType(type);

	index.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits);
		}
		else{
			console.log("Nothing found");
		}
	});
}



//Add a new question
QueryES.prototype.addQuestion = function(data, type, callback){
	var document;

	checkType(type);

	document = mapping.document(data.id);

	document.set(data, function(){
		callback();
	});
}


//update question body
QueryES.prototype.updateQuestion = function(questionID, questionBody, type, callback){
	var link = '/presenter/questions/';

	if(type === 1){
		link = '/accent/questions/';
	}

	link += questionID +'/_update';

	var data = {
		'script':'ctx._source.body = body',
		'params':{
			'body':questionBody
		}
	}

	db.post(link, data, function(){
		callback();
	})
}

//delete a uid
QueryES.prototype.deleteQuestion = function(questionID, type, callback){
	var document;

	checkType(type);

	document = mapping.document(questionID);
	document.delete(function(){
		callback();
	});
}


//change the status of a question from unanswered to answered
QueryES.prototype.updateStatus = function(questionID, type, callback){
	var link = '/presenter/questions/';

	if(type === 1){
		link = '/accent/questions/';
	}

	link += questionID +'/_update';

	var data = {
		'script':'ctx._source.status = status',
		'params':{
			'status':'answered'
		}
	}

	//add new comment to the document found at uid
	db.post(link, data, function(){
		callback();
	})
}


//types: 0 = presenter, 1 = accent
var checkType = function(type){
	if (type === 0){
		index = db.index('presenter')
	}else{
		index = db.index('accent');
	}

	mapping = index.mapping('questions');
}

<<<<<<< HEAD
//////////////////////////////////////////////////////////////////////////////////////////////////
// Comments
//////////////////////////////////////////////////////////////////////////////////////////////////

//get a comment data based on commentID
QueryES.prototype.getComment = function(commentID, type, callback){

	var link = '/' + switchIndex(type) + '/comments/' + commentID;
	
	db.get(link, {}, function(err, req, data){
		callback(data._source);
	});
}

//get all question data based on questionID
QueryES.prototype.getAllCommentByUserID = function(userID, type, callback){
	var data = {
		query: {
			bool:{
				must:[{
					term:{
						user: userID
					}
				}]
			}
		},
		from: 0,
		size: 20
	};

	checkType(type);

	mapping = index.mapping('comments');

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits);
		}
		else{
			callback(data);
			console.log("User did not post any comments");
		}
	});
}

//create a new comment
QueryES.prototype.addComment = function(data, type, callback){
	var document;

	checkType(type);

	mapping = index.mapping('comments');
	
	document = mapping.document(data.id);

	document.set(data, function(){
		callback();
	});
}

//update question body based on questionID
QueryES.prototype.updateComment = function(commentID, comment, type, callback){	

	var link = '/' + switchIndex(type) + '/comments/' + commentID +'/_update';

	var data = {
		'script':'ctx._source.body = body',
		'params':{
			'body':comment
		}
	}

	db.post(link, data, function(){
		callback();
	})
}

//delete a comment
QueryES.prototype.deleteComment = function(commentID, type, callback){
	var document;

	checkType(type);
	mapping = index.mapping('comments');	

	document = mapping.document(commentID);
	document.delete(function(){
		callback();
	});
}



//append a comment questionID to a comment's id list
QueryES.prototype.appendCommentID = function(questionID, commentID, type, callback){
	var link = '/' + switchIndex(type) + '/comments/' + questionID +'/_update';

	var data = {
		'script':'ctx._source.commentIDs += commentID',
		'params':{
			'commentID':commentID
		}
	}
	
	//add new comment to the document found at questionID
	db.post(link, data, function(){
		callback();
	})
}

//delete a comment questionID to a comment's id list
QueryES.prototype.deleteCommentID = function(questionID, commentID, type, callback){
	var link = '/' + switchIndex(type) + '/comments/' + questionID +'/_update';

	var data = {
		'script':'ctx._source.commentIDs.remove(commentID)',
		'params':{
			'commentID':commentID
		}
	}
	
	//add new comment to the document found at questionID
	db.post(link, data, function(){
		callback();
	})
}

//update a comment vote
QueryES.prototype.updateVote = function(commentID, direction, type, callback){
	var data;

	var link = '/' + switchIndex(type) + '/comments/' + commentID +'/_update';

	if (direction === 0) {
		data = {
			'script':'ctx._source.upvote += upvote',
			'params':{
				'upvote':1
			}
		}
	}
	else {
		data = {
			'script':'ctx._source.downvote += downvote',
			'params':{
				'downvote':1
			}
		}
	}

	//increment the vote found at commentID
	db.post(link, data, function(){
		// increment
		callback();
	})
}
=======
>>>>>>> 8c444a63c72d9c5af874fc3746d6c13626fcf8f9

module.exports = new QueryES;
