const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//design or model of document of collections books in cityLibraryDb
const bookSchema = new Schema({
    bNo : {type : Number, required : true },
    isbn: {type : String, required : true},
    bookTitle: {type : String, required : true},
    overdueFee : {type : Number, required : true},
    publisher : {type : String, required : true},
    datePublished : { type : String, required : true},
    
});

//model name will be used to turn into collection name
//'Book' -> indicate - lower case 'book' + s collection of cityLibraryDb
module.exports= mongoose.model('Book', bookSchema)   //creates BooKCollection model, BooK = books of database  which has data or document of bookSchema type
   //we will create object/instances from BookCollection (class) in book.js
