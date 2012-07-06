//THIS IS USED FOR DEFINING MAPPING(to return sorted results)
//Do not have to run this.

var es = require('com.izaakschroeder.elasticsearch'),
	db = es.connect('localhost');

var map = function(appType){
	var path = "/" + appType;

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
					},
					"title": {
						"type": "multi_field",
						"fields": {
							"title": {
								"type": "string"
							},
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							}
						}
					},
					"timestamp": {
						"type": "date",
						"format":"dateOptionalTime"
					},
					"followup": {
						"type": "string"
					}
				}
			},

			"comments": {
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
					"upvote": {
						"type": "string"
					},
					"downvote": {
						"type": "string"
					},
					"timestamp": {
						"type": "date",
						"format":"dateOptionalTime"
					},
					"user": {
						"type": "string"
					},	
					"target_uuid": {
						"type" : "string"
					},
					"title": {
						"type": "multi_field",
						"fields": {
							"title": {
								"type": "string"
							},
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							}
						}
					},
					"objectType": {
						"type" : "string"
					},			
					"isAnswered": {
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

map("presenter");
map("accent");
