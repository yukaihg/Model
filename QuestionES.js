var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost'),
	index = db.index('presenter'),	//maybe read from config file
	mapping = index.mapping('questions');

var QuestionES = function(){
}

//create a new question
QuestionES.prototype.put = function(data, callback){
	var document;

	document = mapping.document();

	document.set(data, function(result){
		if(result){
			callback(result);
		}

		console.log('Document added');
	});
}

//search based on query
QuestionES.prototype.get = function(search, callback){

	if(!search){
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

	mapping.search(data, function(err, data){
		if(data){
			callback(data);
		}
		else{
			console.log("Nothing found");
		}
	});
}

//get all question data based on questionID
QuestionES.prototype.getQuestion = function(uid, callback){
	var link = '/presenter/questions/' + uid;
	db.get(link, {}, function(err, req, data){
		callback(data._source);
	});
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
		callback();
	})
}

//delete a uid
QuestionES.prototype.delete = function(uid, callback){
	var document = mapping.document(uid);
	document.delete(function(){
		callback();
	});
}


module.exports = new QuestionES;
