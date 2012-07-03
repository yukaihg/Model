var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost'),
	index = db.index('big-data'),	//we will use presenter
	mapping = index.mapping('songs');	//use questions

var Question = function(){
}

//create a new question
Question.prototype.put = function(data, callback){

	var document = mapping.document(data._id);
	document.set(data._source, function(){});
}

//search based on uid
Question.prototype.get = function(data, callback){
	mapping.search(data, function(err, data){
		console.log(data.hits.total);
	});
}

//update a uid
Question.prototype.post = function(uid, callback){

}

//delete a uid
Question.prototype.delete = function(uid, callback){
	var document = mapping.document(uid);
	document.delete(function(){
		console.log('removed');
	})

}

module.exports = new Question;
