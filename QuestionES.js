var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost'),
	index = db.index('big-data'),	//we will use presenter
	mapping = index.mapping('songs');	//use questions

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
		console.log(result);
	});
}

//search based on query
QuestionES.prototype.get = function(data, callback){
	mapping.search(data, function(err, data){
		console.log('total found: ' + data.hits.total);
	});
}

//what is there to update lol?
QuestionES.prototype.post = function(uid, callback){

}

//delete a uid
QuestionES.prototype.delete = function(uid, callback){
	var document = mapping.document(uid);
	document.delete(function(){
		console.log('removed');
	});
}

QuestionES.prototype.test = function(question){
	console.log(question.user);
}

//how to get commentID

module.exports = new QuestionES;
