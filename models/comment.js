/* based on this comment schema	
	{
	"user":"mkn3",
	"upvote":"0",
	"downvote":"0",
	"body":"The answer to your question is...",
	"questionIDs":"pJfznhheQuOicWWAjx7F00",
	"timestamp":"2012-06-30"
	}
*/	

//Comment Model
var Comment = function(uuid, user, title, body){
	this.id = uuid;
	this.user = user;
	this.upvote = 0;
	this.downvote = 0;
	this.title = title;
	this.body = body;	
	this.target_uuid = '';
	this.objectType = '';
	this.timestamp	= '2012-07-01';
	this.isAnswered = 'false';
}

module.exports = Comment;