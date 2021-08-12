/**
 * @ author Jyoti R. Khatri
 * @ since Aug 10 2021
 */

//export two things 1)connection and 2) point to the database
const mongoose = require('mongoose')         //third party library (driver connects node with mongodb )
const dbUrl = 'mongodb://localhost:27017';  // mongodb server and port no
                                 
//connecting with server of mongodb 

const mongoConnect = (callback) =>{
    mongoose.connect(dbUrl,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
        dbName : 'cityLibraryDb'
    }).then(client => {
        console.log('Successfully connected to mongodb server');    //db(inbuilt method) point to our database we will be working
        // console.log(client.db)          
        callback();                                   

    }).catch(error => {
        handelError(error)
    })
}


exports.mongoConnect = mongoConnect;