const { response } = require('express');
const BooKCollection = require('../models/book');


exports.getAllBooks = async (req, res, next) => {
    try{
        const allLibraryBooks = await BooKCollection.find();
         res.status(200).json(allLibraryBooks);
    } catch(error){
        next(error)
    }
}

exports.getOneBook = async (req, res, next) => {
    console.log("hello")
    console.log(req.params.bNo)
    console.log("hello")
    try{
        const oneBook = await BooKCollection.find({bNo:req.params.bNo});
        console.log(oneBook)
         res.status(200).json(oneBook);
    } catch(error){
        next(error)
    }
}

exports.addBook = async (req, res, next) => {
    try{
        const body = req.body;
        console.log(req.body)
        const savedBook =  await new BooKCollection( body
            ).save();
    return res.status(201).json(savedBook)
    }catch(error) {
        res.json({Error : "Error: Missing Some Information; Please enter every field."})
        
        next(error)

    }
}


exports.editBook = async (req, res, next) => {
           
    try {
        const body = req.body
        console.log(body)
        console.log(Number(req.params.bNo))
        const editedBook= await BooKCollection.updateOne({bNo: Number(req.params.bNo)}, {$set:body});
        res.status(200).json(editedBook);
    }catch (error){
    
        next(error)
    }

}