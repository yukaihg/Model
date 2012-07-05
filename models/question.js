//question Model
var Question = function(uuid, user, body, category){
	this.id = uuid;
	this.user = user;
	this.body = body;
	this.category = category;
	this.status = 'unanswered';
}

module.exports = Question;