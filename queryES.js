var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost'),
	index = db.index('presenter'),
	mapping = index.mapping('questions'),
	error = { errorcode: 1, message: "Error", err: undefined };

var QueryES = function(){
}

//get a question
QueryES.prototype.getQuestion = function(questionID, type, callback){
	var link = '/presenter/questions/';

	if(type === 1){
		link = '/accent/questions/';
	} else if (type > 1) {
		error.message = "not a valid type";
		callback(data, error);
	}

	link += questionID;

	db.get(link, {}, function(err, req, data){

		if(data){
			callback(data, undefined);
		}else{
			error.message = "object not found in database";
			error.err = err;
			callback(data, error);
		}
	});
}

QueryES.prototype.getAllQuestionByUserID = function(userID, type, callback){
	var data =
	{
		query: {
			term: { user: userID }
		},
		from: 0,
		size: 20
	};

	checkType(type);

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(data);
		}else{
			callback(undefined);
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
				query_string: {
					default_field: '_all',
					query: search
				}
		},
		from: 0,
		size: 20
	};

	checkType(type);

	index.search(data, function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits);
		}else{
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
	var data =
	{
		'script':'ctx._source.body = body',
		'params':{ 'body':questionBody }
	}

	if(type === 1){
		link = '/accent/questions/';
	}

	link += questionID +'/_update';

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
	var data =
	{
		'script':'ctx._source.status = status',
		'params':{ 'status':'answered' }
	}

	if(type === 1){
		link = '/accent/questions/';
	}

	link += questionID +'/_update';

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


module.exports = new QueryES;
