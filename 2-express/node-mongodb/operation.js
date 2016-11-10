'use strict';

const assert=require('assert');

exports.insertDocument=function(db, document, collection, callback){
  const coll=db.collection(collection);
  coll.insertOne(document,function(err,result){
    assert.equal(err,null);
    console.log(`Insert document ${result.result.n} into collection ${collection}`);
    callback(result);
  })
};

exports.findDocument=function(db, collection, callback){
  const coll=db.collection(collection);
  coll.find({}).toArray(function(err,result){
    assert.equal(err,null);
    callback(result);
  });
};

exports.updateDocument=function(db, document, update, collection, callback){
  const coll=db.collection(collection);
  coll.updateOne(document,{ $set: update },null,function(err,result){
      assert.equal(err,null);
      console.log("Updated the document with " + update);
      callback(result); 
  })
};

exports.removeDocument=function(db, document, collection, callback){
  const coll=db.collection(collection);
  coll.deleteOne(document,function(err,result){
     assert.equal(err, null);
      console.log(`Removed the document ${document}`);
    callback(result);
  })

}

