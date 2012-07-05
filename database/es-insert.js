var ElasticSearchImport =  function () {

/**
 * Module dependencies.
 */
var
        es = require('com.izaakschroeder.elasticsearch'),
        fs = require('fs');

var argv = require('optimist').usage('Usage: $0 -h [host] -p [port] -f [file_name]').demand(['f']).default({ h:"localhost", p:9200, f:"qs.json"}).argv;




var db = es.connect(argv.h, argv.p);


this.main = function () {
    importToEs(argv.f);
}


var importToEs = function (f_name) {    
    fs.readFile(f_name, function (err, data) {        
        if (err) {
            throw err;
        }
        else {            
            var json_data = JSON.parse(data);
    
            console.log("data = \n");
            console.log(json_data);

            var total = 0;
            json_data.forEach(function(data) {
                //var str = JSON.stringify(data);
                data_index = data._index;
                data_mapping = data._type;
                data_id = data._id;
                data_source = data._source;

                index = db.index(data_index),
                mapping = index.mapping(data_mapping);



                mapping.document(data_id).set(data_source);;
                if (++total % 100 === 0) {
                    console.log("datas indexed: "+total);
                }



             });
            console.log("The data has been indexed into your database.");

        }
          
    });
}

}

var esi = new ElasticSearchImport();
esi.main();