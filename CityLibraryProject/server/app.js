const express = require('express');
const cors = require('cors');

const mongoConnect = require('./utils/database').mongoConnect;      //give function (callback)=>{};

const bookRouter = require('./routes/bookRouter')
const app = express();

app.use(cors())
app.use(express.json());   //parses incoming request with json


//app.use(authRouter);    //all urls access after authRouter needs JWT

app.use('/books', bookRouter)



// app.use( (req, res,next) => {
//     res.status(404).json ({error : req.url + 'API not supported'})
// })

app.use((err, req, res, next) => {
    console.log(err);

    if(err.messsage === 'NOT Found') {
        res.status(404).json ({error : err.message});
    } else {
        res.status(500).json({error: 'Try Later !'})
    }
});
 //first connect to database server and then only start /run application 
 //mongoConnect(callbacl){} ; from database.jss; callback  is ()=>{app.listen(3000...... }
mongoConnect(() => {
    app.listen(3000, () => console.log('listening to 3000 .....'))
});