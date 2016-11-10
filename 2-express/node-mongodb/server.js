'use strict';
const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const url='mongodb://localhost:27017/conFusion';

const dbopen=require('./operation');

MongoClient.connect(url,function(err,db){
    assert.equal(err,null);
    console.log('connect correctly to server!');
    
    dbopen.insertDocument(db,{ name: "Vadonut1", description: "Test1" },'dishes',function(result){
        console.log(result.ops);

        dbopen.findDocument(db,'dishes',function(result){
            console.log(result);

            dbopen.updateDocument(db,{name: "Vadonut1"},{description: "update Test1"},'dishes',function(result){
                console.log(result.result);

                dbopen.findDocument(db,'dishes',function(doc){
                    console.log(doc);

                    db.dropCollection("dishes", function (result) {
                        console.log(result);
                        db.close();
                    });
                })
            })
        })

    });

})
