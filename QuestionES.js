var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost'),
	index = db.index('presenter'),	//maybe read from config file
	mapping = index.mapping('questions');

var QuestionES = function(){
}

//create a new question
QuestionES.prototype.put = function(data, callback){
	var document;

	//if _id does not exist, ES will return an uid after inserting doc
	if(data._id){
		document = mapping.document(data._id);
	}
	else{
		document = mapping.document();
	}

	document.set(data._source, function(result){
		if(result){
			console.log('ES generated ID is: ' + result);
		}

		console.log('Document added');
	});
}

//search based on query
QuestionES.prototype.get = function(data, callback){
	mapping.search(data, function(err, data){
		if(data){
			console.log(JSON.stringify(data.hits.hits));
		}
		else{
			console.log("Nothing found");
		}
	});
}

//get all comments based on questionID
QuestionES.prototype.getComment = function(uid, callback){
	var link = '/presenter/questions/' + uid;
	db.get(link, {}, function(err, req, data){console.log(data._source.commentIDs)});
}

//add a comment uid to a question's comment id list
QuestionES.prototype.postComment = function(uid, commentID, callback){
	//damit no post method based on mapping

	//TODO: UPDATE status as well if this is the first comment made

	var data = {
		'script':'ctx._source.commentIDs += commentIDs',
		'params':{
			'commentIDs':commentID
		}
	}

	var link = '/presenter/questions/' + uid +'/_update';

	//add new comment to the document found at uid
	db.post(link, data, function(){
		console.log("Comment posted");
	})
}

//delete a uid
QuestionES.prototype.delete = function(uid, callback){
	var document = mapping.document(uid);
	document.delete(function(){
		console.log('removed');
	});
}


module.exports = new QuestionES;
