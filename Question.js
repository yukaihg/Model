//question Model
var Question = function(user, body, category){
	this.user = user;
	this.body = body;
	this.category = category;
	this.status = 'unanswered';

	this.comment = [];
	this.id = '';
}

Question.prototype.comment = function(){
	return this.comment;
}

Question.prototype.id = function(){
	return this.id;
}

module.exports = Question;