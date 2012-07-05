//THIS IS USED FOR DEFINING MAPPING(to return sorted results)
//Do not have to run this.

var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost'),
	index = db.index('presenter'),
	mapping = index.mapping('questions');

var mapQuestion = function(){
	var path = "/presenter";

	var data = {
		"mappings":{
		"questions": {
			"properties": {
				"body": {
					"type": "multi_field",
					"fields": {
						"body": {
							"type": "string"
						},
						"untouched": {
							"type": "string",
							"index": "not_analyzed"
						}
					}
				},
				"category": {
					"type": "string"
				},
				"status": {
					"type": "string"
				},
				"user": {
					"type": "string"
				}
			}
		}
	}
	}
	db.post(path, data, function(err, req, data){
		console.log(data);
	})
};

var mapComment;


mapQuestion();